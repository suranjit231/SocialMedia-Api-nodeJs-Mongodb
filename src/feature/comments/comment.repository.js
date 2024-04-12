import mongoose from "mongoose";
import commentModel from "./commentSchema.js";
import postModel from "../posts/postSchema.js";
import { ObjectId } from "mongodb";

//.... comments repository class

export default class CommentRepository{

    //.... create new comments
    async createComment(commentData){
        try{
            const post = await postModel.findById(commentData.post);

            console.log("Post in create comment: ", post)
            if(!post){
                return {success:false, msg:"Can't add comment! post not found"}
            }

            const existingComments = await commentModel.findOne({post:commentData.post, user:commentData.user});

            if(existingComments){
                return {success:false, msg:"Can't add comment! duplicate comments"}
            }else{
                const newComment = new commentModel(commentData);
                const savedComment = await newComment.save();

            // Check if the comment ID is already present in the comments array
            const isCommentExistsInArray = post.comments.includes(savedComment._id);

            // If the comment ID is not present in the comments array, push it
            if (!isCommentExistsInArray) {
                await postModel.updateOne({ _id: post._id }, { $push: { comments: savedComment._id } });
            }

            return { success: true, msg: "Comment is added", savedComment };

            }

        }catch(error){
            console.log("Comment creation error:", error);
            if(error instanceof mongoose.Error.ValidationError){
               return error.message;
            }

            throw new Error("something went wrong please try later")
        }
    
    }

    //...... update comments
    async updateComments(userId, commentId, text){
        try{
            const comment =await commentModel.findOne({_id:commentId});
            if(!comment){
                return {success:false ,msg:"comments not found", }
            }
            if(comment.user!=userId){
               
                return {success:false ,error:"Unauthodized to update comments", };
            }

            comment.text = text;
            await comment.save();

            return {success:true, msg:"Comment is updates", comment};

        }catch(error){
            console.log(error);
            throw new Error("Something went wrong please try later!")
        }
    }

    //...... get all comments on post
    async getAllComments(postId){
        try{
           //const comments=await commentModel.find({post:postId});
           const comments = await commentModel.find({ post: postId }).populate({
            path: 'user', 
           select: 'name', //... Select only the name field of the user
          
        }).populate({
            path: 'post', //..... Populate the post field of the comment
            select: 'caption', 
           
        });



           if(!comments || comments.length === 0){
                return {success:false, msg:"No comments found in this post"}
           }
         //  const totalComments = comments.length;
           return {success:true, msg:`${comments.length} comments in this post`, comments};
            
        }catch(error){
            throw new Error("Something went wrong please try later!")
        }
    }

    //..... get one comments by comment ID
    async getOneComment(commentId){
        try{
           const comment = await commentModel.findById(commentId);
           if(!comment){
                throw new Error("No comments founds")
           }
           return {success:true, comment}

        }catch(error){
            console.log(error);
            throw error;
        }
    }

    //.... delete comments

    async deleteComments(userId, commentId){
        try{
            const comment = await commentModel.findById(commentId);
            if(!comment){
                throw new Error("Comments not found");
            }
           
            if(comment.user.toString() !==userId){
                throw new Error("UnAuthorized you can't delete this comment");
            }else{
               const deleteResult= await commentModel.findOneAndDelete({_id:commentId, user:userId});
               if(deleteResult){
                    // Remove the comment ID from the comments array in the corresponding post
                await postModel.updateOne({ _id: comment.post }, { $pull: { comments: commentId } });
                return { success: true, msg: "Comment deleted successfully" };

               }
               
            }
            
        }catch(error){
            throw error;
        }
    }

    
}


