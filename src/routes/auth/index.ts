import { login } from "../../controller/auth/login";
import { signup } from "../../controller/auth/signup";
import { Router } from "express";
import { verifyEmailController } from "../../controller/auth/verifyEmailController";
import { isAuthenticated } from "../../middleware/auth/auth";
import { OtpResend } from "../../controller/auth/otpResend";
import { resetPasswordRequestController } from "../../controller/auth/resetPasswordRequest";
import { resetPassword } from "../../controller/auth/resetPassword";
import { changePassword } from "../../controller/auth/changePassword";
import { upload } from "../../middleware/multter";
import { imageUpload } from "../../controller/auth/fileUpload";


const authRouter = Router();

authRouter.post("/login", login as any);
authRouter.post("/signup", signup as any);
authRouter.post("/verify-email", isAuthenticated as any, verifyEmailController as any);
authRouter.post("/resend-otp", isAuthenticated as any, OtpResend as any)
authRouter.post("/upload", upload.single("image"), imageUpload as any);

//Password Reset and Change
authRouter.post("/reset-password-request", resetPasswordRequestController as any);
authRouter.post("/password-reset", resetPassword as any);
authRouter.post("/change-password", isAuthenticated as any, changePassword as any)

export default authRouter;