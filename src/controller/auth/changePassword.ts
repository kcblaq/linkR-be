import { Response } from "express";
import { AuthRequest } from "../../types/customTypes";
import { User, UserInterface } from "../../schema/user";

export async function changePassword(req: AuthRequest, res: Response) {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user;

  try {
    // Fixed the condition here - changed || to &&
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Passwords are required" });
    }

    const user = (await User.findById(userId)) as UserInterface | null;

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isValid = await user.changePassword(currentPassword, newPassword);
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect."
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred.`);
    }
  }
}