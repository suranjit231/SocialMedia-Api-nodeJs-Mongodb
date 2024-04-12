import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }

    
});

const likeModel = mongoose.model("Like", likeSchema);

export default likeModel;