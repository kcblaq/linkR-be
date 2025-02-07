import { isOtpValid } from "../../controller/auth/otpResend";
import { User } from "../../model/user";
import { tokenVerify } from "../../utils/jwt";

export async function verifyEmailService(userId: string, userOtp: string) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "No user found" };
    }
    
    // if (user.otpExpires && user.otpExpires < new Date()) {
    //   return "OTP expired";
    // }
    if (!user.otpExpires || !(user.otpExpires instanceof Date)) {
      return { success: false, message: "Invalid OTP expiration date" };
    }
    const otpValid = isOtpValid(user.otpExpires);
    
    if (!user.otp) {
      return "OTP not found";
    }
    const dbToken = tokenVerify(user.otp);
  //   if(dbToken === userOtp){
  //     await User.findByIdAndUpdate(userId, { otp: null, otpExpires: null, isVerified: true });
  // }

  if (dbToken.userId === userOtp) {
    await User.findByIdAndUpdate(userId, { otp: null, otpExpires: null, isVerified: true });
    return { success: true, message: "Email verified successfully" };
  } else {
    return { success: false, message: "Invalid OTP" };
  }
    
    
  } catch (error) {
    console.error(error);
    throw new Error("Failed to verify email");
  }
}
