import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:[true, "Comment text is required"]
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;