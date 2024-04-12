import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, "name is required"]
    },
    email:{
        type:String,
        unique: true,
        required:[true, "eamil is required"],
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true, "password is reqired"]

    },
    gender:{
        type:String,
        required:[true, "gender is required"],
        enum:["Male", "Female"]
    },
    avatar:{
        type:String,
       
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Friend"
        }
    ]
    

});

const userModel = mongoose.model("User", userSchema);

export default userModel;