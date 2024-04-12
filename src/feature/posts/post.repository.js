import mongoose from "mongoose";
import postModel from "./postSchema.js";
import userModel from "../users/userSchema.js";
import { ObjectId } from "mongodb";
export default class PostRepository{

    //... create a new post
    async addPost(postData){
        try{
            const user = await userModel.findById(postData.user);
            if(!user){
                return {success:false, msg:"Can't make a post user not found!"}
            }

           const newPost= new postModel(postData);
           const savedPost = await newPost.save();

           return {success:true, msg:"Post is added", savedPost};
        }catch(error){
            console.log("Add post error: ", error);
            if(error instanceof mongoose.Error.ValidationError){
               return error.message;
            }

            throw new Error("something went wrong please try later")
        }
        
    }

    //..... update post by post Id
    async updatePost(postId, userId,updates){
        try{
            const post = await postModel.findOne({_id:postId});

            if(!post){
                throw new Error("post is not found");
            }
            if(post.user!=userId){
                throw new Error ("You don't have permission to update it");
            }

            const updateResult = await postModel.findOneAndUpdate(
                {_id:postId, user:userId},
                updates,
                {new:true}
                )

                return {success:true, msg:"Post is updated", updateResult};

        }catch(error){
            console.log(error);
            throw error;
        }
    }

    //.... get post by post ID
    async getPostByPostId(postId){
        try{
            const post= await postModel.findById(postId);
            if(!post){
                throw new Error("post not found");
            }

            return{success:true, post};

        }catch(error){
            console.log(error);
            throw error;
        }
    }

    //.... get post by user ID
    async getPostByUserId(userId){
        try{
            const post = await postModel.find({user:userId});
            if(!post){
                throw new Error("post not found");
            }

            return{success:true, post};

        }catch(error){
            console.log(error);
            throw error;
        }
    }

    //.... delete post
    async deletePost(postId,userId){
        try{
            const post = await postModel.findById(postId);

            if(!post){
                throw new Error("post is not found");
            }
          

            if(!post.user.equals(userId)){
                throw new Error("Unauthorized! you can't delete this post");
            }

            const deleteResult = await postModel.findOneAndDelete({_id:postId, user:new ObjectId(userId)});
            if(deleteResult){
                return {success:true, msg:"Post is deleted sucessfully"};
            }else {
                throw new Error("Failed to delete post");
            }

        }catch(error){
            console.log("Error deleting post: ", error);
            throw error; 
        }
    }
}

