import { User } from "../../schema/user";
import { sendEmail } from "../../services/email";
import { AuthRequest } from "../../types/customTypes";

import { tokenGenerator } from "../../utils/jwt";
import { generateOTP } from "./signup";
import { Response } from "express";

export async function OtpResend(req: AuthRequest, res: Response) {
    const userId = req.user;
    const user = await User.findById(userId);
    const otp = generateOTP();
    
    try {
      const otpExpirationTime = new Date(Date.now() + 30 * 60 * 1000);
      
      const updateOtp = await User.findByIdAndUpdate(userId, {
        otp: tokenGenerator(otp.toString(), "30m"),
        otpExpires: otpExpirationTime,
      });
  
      if (user?.email) {
        sendEmail(user.email, 3, {
          otp: otp.toString(),
          firstname: user.firstname,
          purpose: " to verify your email address and complete your signup."
        });
      }
  
      res.status(200).json({
        message: `New OTP has been generated`,
        data: updateOtp,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error resending OTP" });
    }
  }
  
  // When checking OTP validity, use this comparison:
  export function isOtpValid(storedOtpExpires: Date): boolean {
    return new Date() < storedOtpExpires;
  }