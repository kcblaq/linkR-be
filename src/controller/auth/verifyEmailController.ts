import { Response } from "express";
import { AuthRequest } from "../../types/customTypes";
import { verifyEmailService } from "../../services/auth/verify_email";
import { User } from "../../schema/user";
import { tokenVerify } from "../../utils/jwt";

export const verifyEmailController = async (
  req: AuthRequest,
  res: Response
) => {
    const userId = typeof req.user === "string" ? req.user : undefined;
    const { userOtp } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }

//   try {
//     const userId = req.user;
//     const { userOtp } = req.body;

//     if (!userOtp) {
//       return res.status(400).json({ msg: "OTP is required" });
//     }

//     if (typeof userId !== "string") {
//       return res.status(400).json({ msg: "Invalid user ID" });
//     }
//     console.log("USERID",userId)
//     const user = await User.findById(userId);
   
//     if (!user?.otp) {
//       return res.status(400).json({ msg: "OTP not found" });
//     }
   
//     const dbToken = tokenVerify(user.otp);
//     console.log("VT", dbToken.userId );
//     console.log("UT", userOtp)
//     if(dbToken === userOtp){
//         await User.findByIdAndUpdate(userId, { otp: null, otpExpires: null, isVerified: true });
//     }

//     return res.status(200).json({ msg: "Email verified successfully" });
//   } catch (error) {
//     return res.status(500).json({ msg: error instanceof Error ? error.message 
//         : "Unknown error occurred" });
//   }

try {
    const result = await verifyEmailService(userId, userOtp);
    if (typeof result === 'object' && result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ message: typeof result === 'string' ? result : result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};