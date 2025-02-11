import mongoose, { connections, Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { tokenGenerator } from "../utils/jwt";
import dotenv from "dotenv";
dotenv.config();

export interface UserInterface extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  otp?: string;
  otpExpires: Date;
  isVerified: Boolean;
  comparePassword: (password: string) => Promise<boolean>;
  generatePasswordResetLink: () => string;
  changePassword: (currentPassword: string, newPassword: string) => Promise<Boolean>;
}

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpires: {
    type: Date,
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};
UserSchema.methods.generatePasswordResetLink = async function () {
  const resetToken = tokenGenerator(this._id, "30m");
  return `${process.env.FRONTEND_LINK}/reset-password-request/?token=${resetToken}`;
};

UserSchema.methods.changePassword = async function (
  currentPassword: string,
  newPassword: string
) {
  const isValid = await this.comparePassword(currentPassword);
  if (!isValid) {
    return false;
  }
  this.password = newPassword;
  await this.save();
  return true;
};

export const User = mongoose.model("User", UserSchema);
