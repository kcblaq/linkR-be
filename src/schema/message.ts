import mongoose from "mongoose";
import { IMessage } from "../types/schema_types/schemaTypes";

const MessageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    
})

export const Message = mongoose.model<IMessage & Document>("Message", MessageSchema);