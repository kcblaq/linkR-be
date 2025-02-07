import mongoose from "mongoose";
require('dotenv').config();

const uri = process.env.MONGODB_URI as string;

export async function connect(){
    try {
        await mongoose.connect(uri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
            // serverSelectionTimeoutMS: 5000, 
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}