import { Response, NextFunction, Request } from "express";
import { tokenVerify } from "../../utils/jwt";
import { AuthRequest } from "../../types/customTypes";  // Import custom type

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
    console.log(decoded);
    req.user = decoded.userId; 
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
