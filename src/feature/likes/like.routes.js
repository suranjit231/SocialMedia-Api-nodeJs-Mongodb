import express from "express";
import LikeController from "./like.controller.js";

const likeRoutes = express.Router();
const likeController = new LikeController();

//... toggle like routes
likeRoutes.post("/:postId", (req,res,next)=>{
    likeController.toggleLike(req,res,next);
});

//... count likes
likeRoutes.get("/:postId", (req,res,next)=>{
    likeController.countLike(req,res,next);
})



export default likeRoutes;