import express, { Request, Response } from "express";
import { User } from "../../schema/user";
import { tokenGenerator } from "../../utils/jwt";
import bcrypt from "bcryptjs";

import { AuthRequest } from "../../types/customTypes";
import { UserInterface } from "../../types/schema_types/schemaTypes";
import { sendEmail } from "../../services/email";

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

export async function signup(req: Request, res: Response) {
  const { firstname, lastname, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ msg: "User with Email already exists" });

  const newUser = new User({ firstname, lastname, email, password }) as UserInterface;
  const otp = generateOTP();
  const otpToken = tokenGenerator(otp.toString(), "30m");
  newUser.otp = otpToken;
  newUser.otpExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

  await newUser.save();

  try {
    await sendEmail(newUser.email, 2, {
      otp: otp.toString(),
      firstname: newUser.firstname,
    });
  } catch (error) {
    console.log(`Error sending email: ${error}`);
  }
  const token = tokenGenerator(newUser._id.toString(), "365d");

  res.status(201).json({ token, user: newUser });
}


