import express from "express";
import PostController from "./post.controller.js";
import {upload} from "../../middleware/fileUpload.middleware.js"


const postRoutes = express.Router();
const postControler = new PostController();

//.. create new post routes
postRoutes.post("/", upload.single('imageUrl'), (req,res,next)=>{
    postControler.createPost(req,res,next);
});

//... delete post by post ID
postRoutes.delete("/:postId", (req,res,next)=>{
    postControler.deletePost(req,res,next);
})


//.. update post routes
postRoutes.put("/update/:postId", upload.single('imageUrl'), (req,res,next)=>{
    postControler.updatePost(req,res,next);
});

//... get post by post ID
postRoutes.get("/getone/:postId", (req,res,next)=>{
    postControler.getPostByPostId(req,res,next);
});


//... get post by user id
postRoutes.get("/user-post/:userId", (req,res,next)=>{
    postControler.getPostByUserId(req,res,next);
})




export default postRoutes;
