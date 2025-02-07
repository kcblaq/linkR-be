// middleware/auth/auth.ts
import { Request, Response, NextFunction } from "express";
import { tokenVerify } from "../../utils/jwt";
import { AuthRequest } from "../../types/customTypes";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ msg: "Access denied. Provide token to access this route" });
  }

  try {
    const decoded = tokenVerify(token);
    (req as AuthRequest).user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};