import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectMongoose } from "./src/config/mongooseConfig.js";
import userRoutes from "./src/feature/users/user.routes.js";
import cookieParser from "cookie-parser";
import { auth } from "./src/middleware/jwt.middleware.js";
import otpRoutes from "./src/feature/otpSend/otpSend.routes.js";
import postRoutes from "./src/feature/posts/post.routes.js";
import commentRoutes from "./src/feature/comments/comment.routes.js";
import likeRoutes from "./src/feature/likes/like.routes.js";
import frindshipRoutes from "./src/feature/friendship/friendship.routes.js";
import swagger from "swagger-ui-express";
import apiDocs from './swagger.json' assert {type: 'json'};



const server = express();

// const corsOptions={
//     origin:"*",
//     allowedHeader:"*"
// }

server.use(cors())
server.use(express.json());
server.use(cookieParser());

//.... swagger documentation api...
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

//.... user middleware
server.use("/api/users", userRoutes);

//.... OTP vefify middleware
server.use("/api/otp", auth, otpRoutes);

//... Post middleware
server.use("/api/posts",auth, postRoutes);

//... comments middleare
server.use("/api/comments", auth, commentRoutes);

//... like middleware
server.use("/api/likes", auth, likeRoutes);

//...friendhip middleware
server.use("/api/friendship",auth, frindshipRoutes);

//....default response and server listening
// 4. Middleware to handle 404 requests.
server.use((req, res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs")
  });

server.listen(3200, ()=>{
    console.log("serer is listening on port 3200");
    connectMongoose();
})