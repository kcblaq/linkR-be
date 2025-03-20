import { env } from "../utils/env";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User, UserInterface } from "../schema/user";
import { tokenGenerator } from "../utils/jwt";

interface GoogleI {
    id: string;
    name?: { familyName?: string; givenName?: string; middleName?: string | undefined; } | undefined;
    emails?: { value: string; verified?: boolean }[];
    photos?: { value: string }[];
    password?: string;
}

const handleGoogleAuth = async (profile: GoogleI, isLogin: boolean) => {
    const password = Math.random().toString(36).slice(-10);
    const payload = {
        email: profile?.emails?.[0]?.value ?? '',
        password,
        firstname: profile.name?.givenName || '',
        lastname: profile.name?.familyName || '',
        googleId: profile.id,
        provider: 'google',
        isVerified: true,
        avatar: profile.photos?.[0]?.value ?? '',
        token: tokenGenerator(profile.id, '365d', profile?.emails?.[0]?.value ?? ''),
    };
    console.log("🔍 Received Google Profile:", profile);
    console.log("ISLOGIN:", isLogin);
    try {
        let user = await User.findOne({ googleId: profile.id }) || await User.findOne({ email: payload.email });
        console.log("🔍 Found User:", user);
        if (isLogin) {
            if (!user) {
                throw new Error("User does not exist. Please sign up first.");
            }

            // If user exists by email but doesn't have a googleId, update it
            if (!user.googleId) {
                user.googleId = profile.id;
                await user.save();
            }

            const token = tokenGenerator(user.id, '365d', user.email);
            return { success: true, user, token };
        } else {
            if (user) {
                throw new Error("Email already taken. Please login or try with another email");
            }

            const newUser = new User(payload);
            await newUser.save();
            return { success: true, user: newUser, token: tokenGenerator(newUser.id, '365d', newUser.email) };
        }
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "An unexpected error occurred" };
    }
};


export const passportConfig = () => {
    // Single Google Strategy that handles both login and signup
    passport.use('google',
        new GoogleStrategy({
            clientID: env.GOOGLE_CLIENT_ID || '',
            clientSecret: env.GOOGLE_CLIENT_SECRET || '',
            callbackURL: env.GOOGLE_CALLBACK_URL, // Keep using the original callback URL
            passReqToCallback: true // This allows us to access the request
        },
        async(req, accessToken, refreshToken, profile, done) => {
            try {
                // Determine if this is a login or signup based on session
                const isLogin = req.session?.authMode === 'login';
                console.log(`Auth mode from session: ${req.session?.authMode}, isLogin: ${isLogin}`);
                
                const result = await handleGoogleAuth(profile as GoogleI, isLogin);
                console.log("Result:", result);
                
                if (result.success) {
                    // Make sure to convert mongoose document to plain object if needed
                    const userObj = result.user?.toObject ? result.user.toObject() : result.user;
                    return done(null, { ...userObj, token: result.token });
                } else {
                    console.log("Auth error:", result.error);
                    return done(null, false, { message: result.error });
                }
            } catch (error) {
                if(error instanceof Error) {
                    console.log("Auth error:", error.message);
                    return done(error, false);
                } else {
                    console.log("An unexpected error occurred", error);
                    return done(new Error("An unexpected error occurred"), false);
                }
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user: any, done) => {
        done(null, user);
    });
};