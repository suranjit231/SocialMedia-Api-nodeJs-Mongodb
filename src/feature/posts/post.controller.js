import UserRepository from "../users/user.repository.js";
import PostRepository from "./post.repository.js";

export default class PostController{
    constructor(){
        this.postRepository = new PostRepository();
    }

    async createPost(req,res,next){
        try{
            const userId = req.userId;
            const { caption }=req.body;
           const imageUrl = req.file.filename;
          const postResult=await this.postRepository.addPost({user:userId, caption, imageUrl:imageUrl});

          if(!postResult.success){
            return res.status(400).send(postResult);
          }

          res.status(201).send(postResult);

        }catch(error){
            console.log(error);
            res.send(error.message);
        }
    }


    //.... update post
    async updatePost(req,res,next){
        try{
            const postId = req.params.postId ;
            const userId = req.userId;
            const updates = req.body;

            if(req.file){
                updates.imageUrl = req.file.filename;
            }

        const updateResult=await this.postRepository.updatePost(postId, userId, updates);
        res.status(200).send(updateResult);

        }catch(error){
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    //..... get post by postId
    async getPostByPostId(req,res,next){
        try{
            const postId = req.params.postId;
            const post = await this.postRepository.getPostByPostId(postId);
            if(!post){
                return res.status(400).send("Post not found");
            }

            return res.status(200).send(post);

        }catch(error){
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    //.... get post by user
    async getPostByUserId(req,res,next){
        try{
            const userId = req.params.userId;
            const post = await this.postRepository.getPostByUserId(userId);
            if(!post){
                return res.status(400).send("Post not found");
            }

            return res.status(200).send(post);

        }catch(error){
            console.log(error);
            res.status(400).send(error.message);
        }
    }

    //... delete post one
    async deletePost(req,res,next){
        try{
            const postId = req.params.postId;
            const userId = req.userId;

            const deleteResult = await this.postRepository.deletePost(postId,userId);
            if(deleteResult.success){
                res.status(200).send(deleteResult);
            }

        }catch(error){
            console.log(error);
            res.status(400).send(error.message);
        }
    }
}