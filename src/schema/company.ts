
import mongoose, { Schema } from "mongoose";
import { ICompany } from "../types/schema_types/schemaTypes";



const CompanySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    industry: { type: String, required: true },
    logo: { type: String, required: true },
    website: { type: String, required: true },
    size: { type: String, required: true },
    location: { type: String, required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    foundedDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
  
  export default mongoose.model<ICompany>('Company', CompanySchema);
