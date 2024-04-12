import CommentRepository from "./comment.repository.js";

//...... comment controller class
export default class CommentController{

    //...... create an instance of comment repository class
    constructor(){
        this.commentRepository = new CommentRepository();
    }

    //...... crateate new comment
    async createComment(req,res,next){
        try{
            const userId = req.userId;
            const postId = req.params.postId;
            const { text } = req.body;

           const comment= await this.commentRepository.createComment({user:userId, post:postId, text:text});
           if(!comment.success){
                return res.status(400).send(comment);
           }else{
            return res.status(201).send(comment);
           }

           

        }catch(error){
            console.log(error);
            res.send(error.message);
        }
    }

    //...... update comments
    async udateComments(req,res,next){
        try{
            const userId = req.userId;

            const {commentId, text} = req.body;

            if(!text || text.trim() === ''){
                return res.status(400).send({ error: "Text cannot be null or empty" });
            }

         const updateResult= await this.commentRepository.updateComments(userId,commentId,text);
        if(!updateResult.success){
            return res.status(400).send(updateResult);
        };

          return res.status(200).send(updateResult);

        }catch(error){
            console.log(error);
            res.send(error.message);
        }
    }

    //.... get all comments by post id
    async getAllComments(req,res,next){
        try{
            const postId = req.params.postId;
            const getResult= await this.commentRepository.getAllComments(postId);
            if(!getResult.success){
                return res.status(400).send(getResult);
            }

            return res.status(200).send(getResult);

        }catch(error){
            console.log(error);
            throw new Error("Somethng went wrong")
        }
    }

     //..... get one comments by comment ID
     async getOneComment(req,res,next){
        try{
           const commentId = req.params.commentId;
           const comment=await this.commentRepository.getOneComment(commentId);
            res.status(200).send(comment);
        }catch(error){
            console.log(error);
            return res.status(400).send(error.message);
        }
    }

    //...... delete comments from post
    async deleteComment(req,res,next){
        try{
            const commentId = req.params.commentId;
            const userId = req.userId;

            const deleteResult = await this.commentRepository.deleteComments(userId, commentId);
            if(deleteResult.success){
                return res.status(200).send(deleteResult);
            }

        }catch(error){
            console.log(error);
           return res.status(400).send(error.message);
        }
    }

}