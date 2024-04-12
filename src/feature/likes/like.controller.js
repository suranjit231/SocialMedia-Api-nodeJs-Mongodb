import LikeRepository from "./like.ropository.js";

//.... like controller class
export default class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }

    //... controller methods for toggle like
    async toggleLike(req,res,next){
        try{
            const userId= req.userId;
            const postId = req.params.postId;
            console.log("postIdin controller:", postId);

            const likeResult= await this.likeRepository.toggleLike(userId,postId);
            if(likeResult.success){
                return res.status(200).send(likeResult);
            }

        }catch(error){
            return res.status(400).send(error.message);
        }
    }

    //.... count likes on a post
    async countLike(req,res,next){
        try{
            const postId= req.params.postId;
            const countResult = await this.likeRepository.countLike(postId);
            if(countResult){
                return res.status(200).send(countResult);
            }

        }catch(error){
            return res.status(400).send(error.message);
        }
    }

}