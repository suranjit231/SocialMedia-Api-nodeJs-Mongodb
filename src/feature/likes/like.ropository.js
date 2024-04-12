import mongoose from "mongoose";
import likeModel from "./likeSchema.js";
import postModel from "../posts/postSchema.js";

//..... like repository class
export default class LikeRepository{
    async toggleLike(userId, postId){
        try{
            const existingLike = await likeModel.findOne({user:userId, post:postId});
            const post = await postModel.findById(postId);
            console.log("repository post:", post);
            if(!post){
                throw new Error("Post not found");
            }

        //.. if like already exist then remove the like 
            if(existingLike){
               await likeModel.deleteOne({user:userId, post:postId});
               await postModel.updateOne({_id:postId}, {$pull:{likes:existingLike._id}});

               return {success:true, msg:"Like is removed sucessfully"}
        //.. if not existing like then create a new like and also update like array of post
            }else{
                const newLike = new likeModel({user:userId, post:postId});
                const savedLike = await newLike.save();
                if(!post.likes.includes(savedLike._id)){
                    await postModel.updateOne({_id:postId}, {$push:{likes:newLike._id}});
                    return {success:true, msg:"Post is liked sucessfully"}
                }
               
            }

        }catch(error){
            throw error;
        }
    }

    //....count like 
    async countLike(postId){
        try{
            const post = await postModel.findById(postId);
            if(!post){
                throw new Error("post not found");
            }

            const totalLike = post.likes.length;
            console.log("totalLike:", totalLike);
            return {post, likes:`${totalLike}`};



        }catch(error){
            throw error;
        }
    }
}
