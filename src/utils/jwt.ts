import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function tokenGenerator(userId: string, expiresIn: any, email?: string,): string{
  try{
    return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: expiresIn});
  }
  catch(error){
    throw new Error("Failed to generate token");
  }
}


export function tokenVerify(token: string):any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  
}