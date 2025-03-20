import mongoose, {Schema} from 'mongoose';


const NotificationSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    relatedId: { type: Schema.Types.ObjectId, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
  }

);
  

export default mongoose.model('Notification', NotificationSchema);