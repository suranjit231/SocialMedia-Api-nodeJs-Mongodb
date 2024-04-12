import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        required:[true, "caption is required"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "user ID is reqired"]
    },
    imageUrl:{
        type:String,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User", 
        }
    ]
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;