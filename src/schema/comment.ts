import mongoose from "mongoose";
import { IComment } from "../types/schema_types/schemaTypes";

const CommentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    },
    {
      timestamps: true,
    }
    )
    export const Comment = mongoose.model<IComment & Document>("Comment", CommentSchema);