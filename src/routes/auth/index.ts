import { login } from "../../controller/auth/login";
import { signup } from "../../controller/auth/signup";
import { Request, Response, Router } from "express";

// Extend the Request and SessionData interfaces to include custom properties
import 'express-session';

declare global {
    namespace Express {
        interface User {
            token?: string;
        }
    }
}

declare module 'express-session' {
    interface SessionData {
        authMode?: 'login' | 'signup';
    }
}
import { verifyEmailController } from "../../controller/auth/verifyEmailController";
import { isAuthenticated } from "../../middleware/auth/auth";
import { OtpResend } from "../../controller/auth/otpResend";
import { resetPasswordRequestController } from "../../controller/auth/resetPasswordRequest";
import { resetPassword } from "../../controller/auth/resetPassword";
import { changePassword } from "../../controller/auth/changePassword";
import passport from 'passport';

const authRouter = Router();

authRouter.post("/login", login as any);
authRouter.post("/signup", signup as any);

// OAuth Views
authRouter.get('/oauth', (req, res) => {
    res.send(`
        <h1>OAuth Authentication</h1>
        <div>
            <a href="/auth/google/signup">Signup with Google</a>
        </div>
        <div>
            <a href="/auth/google/login">Login with Google</a>
        </div>
    `);
});

authRouter.get('/login', (req, res) => {
    res.send('Here is the login page');
});

// Google OAuth Routes - Signup
authRouter.get("/google/signup", (req, res, next) => {
    if (req.session) {
        req.session.authMode = 'signup';
    }
    next();
}, passport.authenticate('google', {
    scope: ['email', 'profile']
}));

// Google OAuth Routes - Login
authRouter.get("/google/login", (req, res, next) => {
    if (req.session) {
        req.session.authMode = 'login';
    }
    next();
}, passport.authenticate('google', {
    scope: ['email', 'profile']
}));

// Common Google OAuth callback
authRouter.get("/google/verify", 
    passport.authenticate('google', { 
        failureRedirect: '/auth/login',
        failureMessage: true
    }),
    (req: Request, res: Response) => {
        if (req.user && req.user.token) {
            res.cookie('auth_token', req.user.token, { 
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            });
            res.redirect('/dashboard');
        } else {
            res.redirect('/auth/login');
        }
    }
);

// Other Auth Routes
authRouter.post("/verify-email", isAuthenticated as any, verifyEmailController as any);
authRouter.post("/resend-otp", isAuthenticated as any, OtpResend as any);

// Password Reset and Change
authRouter.post("/reset-password-request", resetPasswordRequestController as any);
authRouter.post("/password-reset", resetPassword as any);
authRouter.post("/change-password", isAuthenticated as any, changePassword as any);

export default authRouter;