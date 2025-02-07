import { Request, Response } from "express";
import { tokenVerify } from "../../utils/jwt";
import { User } from "../../model/user";

export async function resetPassword(req: Request, res: Response) {
  const { token, newPassword } = req.body;
  try {
    const decoded = tokenVerify(token);
    const userId = decoded.userId;

    const user = User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Token invalid or expired" });
    }
    await User.findByIdAndUpdate(userId, { password: newPassword });
    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
