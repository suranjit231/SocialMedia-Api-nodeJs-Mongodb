import mongoose from "mongoose";
import friendshipModel from "./friendshipSchema.js";
import userModel from "../users/userSchema.js";


//... friendship repository class
export default class FriendshipRepository{

    //..... sending friend request
    async sendFriendRequest(fromUserId, toUserId){
        try{
             //..... finding the user
            const fromUser = await userModel.findById(fromUserId);
            const toUser = await userModel.findById(toUserId);

            if(!fromUser || !toUser){
                throw new Error("User not founds");
            };

            const existingFriendship = await friendshipModel.findOne({
                $or: [
                    { user: fromUserId, friend: toUserId },
                    { user: toUserId, friend: fromUserId }
                ]
            });
            //...... if already friend then send error message
            if (existingFriendship) {
                console.log("existingFriendship.status :", existingFriendship.status);
                throw new Error(`Users are already send request! status: ${existingFriendship.status} `, );
            }

            //....... 
            const friendship = new friendshipModel({ user: fromUserId, friend: toUserId, status: "pending" });
            await friendship.save();

            // Update sender's friends array
            fromUser.friends.push(friendship._id);
            await fromUser.save();

            // Update receiver's friends array
            toUser.friends.push(friendship._id);
            await toUser.save();


            return {sucess:true, msg:"Friend request is send sucessfully", friendshipDocs:friendship};



        }catch(error){
            console.log("Send request Error:", error);
            if(error instanceof mongoose.Error.ValidatorError){
                return error.message;
            } else {
                // return "Failed to send friend request: " + error.message;
                throw error;
            }

        }

    }


    //..... request in pending status
    //..... request accept
     //......accept friend request  by user
     async acceptFriendRequest(accepterId, requestDocId){
        try{
            const friendshipDocs = await friendshipModel.findById(requestDocId);
            if(!friendshipDocs){
                throw new Error("No friend request send yet!")
            }
             // Check if the user is the recipient of the friend request
            if(friendshipDocs.friend.toString()!==accepterId){
                throw new Error("You can't accept this request as it's not addressed to you.");
            }

             //...... lastly now if friendshipDocs.status="pending" then make friends and allow conversation
            if(friendshipDocs.status=="pending"){
                friendshipDocs.status = "friends";
                 await friendshipDocs.save();
                 return { success: true, msg: "Friend request accepted successfully." };
            }else{
                throw new Error("Friend request is not pending.");
            }

        }catch(error){
            console.log("Accept request error", error);
            throw error;
        }
           
     }

     //...... find all friends request with their status
     async getAllFriendshipStatus(accepterId){
        try{
            const allFriendsStatus =await friendshipModel.find({friend:accepterId}).populate('user', 'name');;
            if(allFriendsStatus.length==0){
                return {success:false, msg:"No friends founds and No request sends to you!"}

            }else{
                let pendingCount = 0;
                let friendsCount = 0;
                for(const friendship of allFriendsStatus){
                    if(friendship.status === "pending"){
                        pendingCount++;
                    } else if(friendship.status === "friends"){
                        friendsCount++;
                    }
                }

                return { 
                    success: true, 
                    msg: `Total pending status: ${pendingCount}, Total friend status: ${friendsCount}` ,allFriendsStatus,
                };
            }

        }catch(error){
            console.log("Accept request error", error);
            throw error;
        }
     }

     //.....get all friends only which status is friends
     async getAllFriendOnly(userId){
        try{

            //.. make a filter critria that userId may be found in user or friend field and their staus is firend
            const filterCriteria = {
                $or: [
                    { user: userId },
                    { friend: userId }
                ],
                status: "friends"
            };
           //... apply this filter criteria to find friends of user and pouplate both username and friend name
            const getAllFriends = await friendshipModel.find(filterCriteria).populate('friend', 'name').populate('user', 'name');
            console.log("getAll friends", getAllFriends)
            //.. check if result is not empty
            if(!getAllFriends || getAllFriends.length==0){
                return {success:false, msg:"You have no friends"};
            }else{

                //. if result is not empty then iterate each od friendshipDocs
                const processedFriends = getAllFriends.map(friendship => {
                    // If the user ID matches the provided userId, set the name to the friend's name, else set it to the user's name
                    const friendName = (friendship.user._id.toString() === userId) ? friendship.friend.name : friendship.user.name;
                    
                    // Return only necessary fields
                    return {
                        _id: friendship._id,
                        name: friendName,
                        status: friendship.status,
                        createdAt: friendship.createdAt,
                        updatedAt: friendship.updatedAt
                    };
                });
                const totalFriends=processedFriends.length;
                return {success:true, msg:`You have ${totalFriends}`, processedFriends};
            }

        }catch(error){
            console.log("getAllFriendOnly error", error);
            throw error;
        }
     }
    //.... get all pending friendRequest
    async getAllPendingRequest(userId){
        try{
            const filterCriteria= {
                friend:userId,
                status:"pending"
            }
            const pendingResult = await friendshipModel.find(filterCriteria).populate('user', 'name');
            if(!pendingResult || pendingResult.length==0){
                return {success:false, msg:"You have no friends request is pending"};
            }else{
                const totalPending = pendingResult.length;
                return {success:true, msg:`Total: ${totalPending} friend request is pending.`, pendingResult};
            }

        }catch(error){
            console.log("get pending request error", error);
            throw error;
        }
    }

       
    //..... rejecting friend request
    async rejectFriendRequest(accepterId, friendshipDocsId){
        try{
            const friendshipDocs=await friendshipModel.findById(friendshipDocsId).populate('user', 'name');

            if(!friendshipDocs){
                throw new Error("No request found");
            }

            if(friendshipDocs.friend.toString()!== accepterId){
                throw new Error("Unauthorized! You can't reject this request. it's not addressed to you.");
            }else{

                if(friendshipDocs.status=="pending"){
                    const userName = friendshipDocs.user.name;
                    friendshipDocs.status="rejecting";
                    friendshipDocs.save();

                    return { success: true, msg: `You have rejected ${userName}'s friend request` };
                }else{
                    throw new Error("Can't reject friend request he is your friends you can block them!");
                }
                
            }

        }catch(error){
            console.log("Accept request error", error);
            throw error;
        }
    }


}
