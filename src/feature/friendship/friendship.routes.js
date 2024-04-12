import express from "express";
import FriendshipController from "./friendship.controller.js";

const frindshipRoutes = express.Router();
const friendshipController = new FriendshipController();

//.... routes for send friend request
frindshipRoutes.post("/send", (req,res,next)=>{
    friendshipController.sendFriendRequest(req,res,next);
});

//.... accept friend request
frindshipRoutes.put("/accept/:requestDocId", (req,res,next)=>{
    friendshipController.acceptFriendRequest(req,res,next);
});

//.... reject friend request
frindshipRoutes.put("/reject/:requestDocId", (req,res,next)=>{
    friendshipController.rejectFriendRequest(req,res,next);
})

//..... get all friends only
frindshipRoutes.get("/getAllFriend", (req,res,next)=>{
    friendshipController.getAllFriendOnly(req,res,next);
});

//.... get  all friendship status result
frindshipRoutes.get("/getAllStatus", (req,res,next)=>{
    friendshipController.getAllFriendshipStatus(req,res,next);
});

//... get all pending friend request 
frindshipRoutes.get("/getPending-request", (req,res,next)=>{
    friendshipController.getAllPendingRequest(req,res,next);
})








//.... export friendsfip router
export default frindshipRoutes;
