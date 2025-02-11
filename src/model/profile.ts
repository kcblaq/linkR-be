import mongoose from "mongoose";



const profileSchema = new mongoose.Schema({

    headline: String,
    summary: String,
    profilePicture: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    experience: [{type: mongoose.Schema.Types.ObjectId, ref: "Experience"}],
    education: [{type: mongoose.Schema.Types.ObjectId, ref: "Education"}]

})

const ProfileSchema = mongoose.model("Profile", profileSchema);
export default ProfileSchema;