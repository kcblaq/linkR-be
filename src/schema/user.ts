import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { tokenGenerator } from "../utils/jwt";
import dotenv from "dotenv";
import { UserInterface } from "../types/schema_types/schemaTypes";
dotenv.config();


const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    required: false,
  },
  provider:{
    type: String,
    required: false,
  },
  googleId:{
    type: String,
    required: false,
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
  headling: {
    type: String,
    required: false,
  },
  backgroundImage: { type: String },
  pendingConnections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  skills: [{ type: String }],
  experiences: [{
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
  }],
  education: [{
    school: { type: String, required: true },
    degree: { type: String },
    fieldOfStudy: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date }
  }],
  connections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  
},
{
  timestamps: true,
}
)

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

export const User = mongoose.model<UserInterface>("User", UserSchema);
