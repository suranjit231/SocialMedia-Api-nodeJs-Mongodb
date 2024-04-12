import mongoose from "mongoose";
//const url = process.env.DB_URL

export const connectMongoose=async()=>{
await mongoose.connect(process.env.DB_URL);
console.log("mongoose is connected");

}