import express from "express";
import CommentController from "./comment.controller.js";

const commentRoutes = express.Router();
const commentController = new CommentController();

//.... post new coments
commentRoutes.post("/:postId", (req,res,next)=>{
    commentController.createComment(req,res,next);
});

//.... get all comments by post ID
commentRoutes.get("/getall/:postId", (req,res,next)=>{
    commentController.getAllComments(req,res,next);
});

//.... delete comments by comment ID
commentRoutes.delete("/:commentId", (req,res,next)=>{
    commentController.deleteComment(req,res,next);
})

//.... update comments
commentRoutes.put("/", (req,res,next)=>{
    commentController.udateComments(req,res,next);
});

//... get one comments by comments Id
commentRoutes.get("/get-one/:commentId", (req,res,next)=>{
    commentController.getOneComment(req,res,next);
})

export default commentRoutes;