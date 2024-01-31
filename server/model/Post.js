import mongoose from "mongoose";
const postShchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true,})

const Post = mongoose.model("Posts",postShchema);
export default Post;