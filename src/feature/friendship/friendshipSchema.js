import mongoose from "mongoose";

const friendshipSchema = new mongoose.Schema({
    //.... who send request
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "user is requierd"]
    },
    //....  to whom send request
    friend:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "user is requierd"]
    },

    status:{
        type:String,
        enum:["send","pending", "friends", "rejecting"],
        required:[true, "Friendship status is requird"]
    }
},{ timestamps: true });

        
const friendshipModel = mongoose.model("Friend", friendshipSchema);
export default friendshipModel;