import FriendshipRepository from "./friendship.repository.js";

export default class FriendshipController{
    constructor(){
        this.friendshipRepository = new FriendshipRepository();
    }

    //.... sending friend request
    async sendFriendRequest(req,res,next){
        try{
            const fromUserId = req.userId;
            const toUserId = req.body.user;
            if(!fromUserId || !toUserId){
                throw new Error("Sender or receiver ID is required!")
            }

            const sendRequestResult = await this.friendshipRepository.sendFriendRequest(fromUserId, toUserId);
            if(sendRequestResult.sucess){
                return res.status(200).send(sendRequestResult);
            }



        }catch(error){
            console.log(error);
            return res.status(400).send(error.message);
        }
    }

    //..... accepting friend request
    async acceptFriendRequest(req,res,next){
        try{
            const requestAccepterId=req.userId;
            const requestDocId = req.params.requestDocId;

            if(!requestDocId){
                throw new Error("No request is done");
            }

            const acceptResult = await this.friendshipRepository.acceptFriendRequest(requestAccepterId, requestDocId);
            if(acceptResult.success){
                return res.status(200).send(acceptResult);
            }

        }catch(error){
            console.log(error);
            return res.status(400).send(error.message);
        }
    }

    //..... get all friends status
    async getAllFriendshipStatus(req,res,next){
        try{
            const userId = req.userId;
            const getFriendsStatusResult= await this.friendshipRepository.getAllFriendshipStatus(userId);
            if(!getFriendsStatusResult.success){
                return res.status(400).send(getFriendsStatusResult);
            }else{
                return res.status(200).send(getFriendsStatusResult);
            }

        }catch(error){
            console.log(error);
            return res.status(400).send(error.message);
        }
    }

    //...... reject friend request
    async rejectFriendRequest(req,res,next){
        try{
            const accepterId= req.userId;
            const requestDocId = req.params.requestDocId;
            if(!requestDocId){
                throw new Error("No request is done");
            }

            const rejectResult = await this.friendshipRepository.rejectFriendRequest(accepterId, requestDocId);
            if(rejectResult.success){
                return res.status(200).send(rejectResult);
            }



        }catch(error){
            console.log(error);
            return res.status(400).send(error.message);
        }
    }

    //..... get all friends which status is friends fetch by userID
    async getAllFriendOnly(req,res,next){
        try{
            const userId = req.userId;
            const allFriends = await this.friendshipRepository.getAllFriendOnly(userId);
            if(!allFriends.status){
                return res.status(400).send(allFriends);
            }else{
                return res.status(200).send(allFriends);
            }

        }catch(error){
            console.log(error);
            return res.status(400).send(error.message);
        }
    }

    //.... get all pending friend request
    async getAllPendingRequest(req,res,next){
        try{
            const userId = req.userId;
            const pendingResult = await this.friendshipRepository.getAllPendingRequest(userId);
            if(!pendingResult.success){
                return res.status(400).send(pendingResult);
            }else{
                return res.status(200).send(pendingResult);
            }

        }catch(error){
            console.log(error);
            return res.status(400).send(error.message);
        }
    }

}