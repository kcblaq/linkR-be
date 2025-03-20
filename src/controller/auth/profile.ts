import { Request, Response, NextFunction } from "express";
import { User } from "../../schema/user";
import { errorHandler } from "../../utils/errorHandler";

export class ProfileController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user || !req.user._id) {
        return res.status(400).json({ message: "User information is missing" });
      }
      
      const user = await User.findById(req.user._id).select("-password -otp -otpExpires");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.status(200).json(user);
    } catch (error) {
      next(error);  // Pass error to Express error middleware
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(400).json({ message: "User information is missing" });
      }
      
      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      }).select("-password -otp -otpExpires");  // Keep the response clean

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      next(error); // Pass error to middleware
    }
  }
}

export const profileController = new ProfileController();


export async function getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user || !req.user._id) {
        return res.status(400).json({ message: "User information is missing" });
      }
      
      const user = await User.findById(req.user._id).select("-password -otp -otpExpires");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.status(200).json(user);
    } catch (error) {
      next(error);  
    }
  }