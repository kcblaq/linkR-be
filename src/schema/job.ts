import mongoose, { Schema, Document } from 'mongoose';
import { IJob } from '../types/schema_types/schemaTypes';


const JobSchema: Schema = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    employmentType: { type: String, required: true },
    skills: [{ type: String }],
    applicants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    postedDate: { type: Date, default: Date.now },
    expirationDate: { type: Date, required: true }
  },
{
    timestamps: true,
  
}
);
  
  export default mongoose.model<IJob>('Job', JobSchema);
  