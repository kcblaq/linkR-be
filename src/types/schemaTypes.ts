import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    email: string;
  password: string;
  firstName: string;
  lastName: string;
  headline?: string;
  location?: string;
  skills: string[];
  experiences: Array<{
    title: string;
    company: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }>;
  education: Array<{
    school: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate: Date;
    endDate?: Date;
  }>;
  connections: mongoose.Types.ObjectId[];
  pendingConnections: mongoose.Types.ObjectId[];
  profilePicture?: string;
  backgroundImage?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface IPost extends Document {
    userId: mongoose.Types.ObjectId;
    content: string;
    mediaUrls: string[];
    likes: mongoose.Types.ObjectId[];
    comments: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }


  export interface IComment extends Document {
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    content: string;
    likes: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IJob extends Document {
    companyId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    location: string;
    employmentType: string;
    skills: string[];
    applicants: mongoose.Types.ObjectId[];
    postedDate: Date;
    expirationDate: Date;
  }

  export interface ICompany extends Document {
    name: string;
    description: string;
    industry: string;
    logo: string;
    website: string;
    size: string;
    location: string;
    followers: mongoose.Types.ObjectId[];
    foundedDate: Date;
    createdAt: Date;
  }

  export interface IMessage extends Document {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
    sentAt: Date;
  }

  export interface INotification extends Document {
    userId: mongoose.Types.ObjectId;
    type: string;
    content: string;
    relatedId: mongoose.Types.ObjectId;
    isRead: boolean;
    createdAt: Date;
  }