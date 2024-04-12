import express from "express";
import UserController from "./user.controller.js";
import {auth} from "../../middleware/jwt.middleware.js";
import { upload } from "../../middleware/fileUpload.middleware.js";

const userRoutes = express.Router();
const userController = new UserController();

//... user register routes
userRoutes.post("/signup", (req,res,next)=>{
    userController.userRegisterController(req,res,next);
});

//... user signin routes
userRoutes.post("/signin", (req,res,next)=>{
    userController.userLoginController(req,res,next);
});
//... user logout routes
userRoutes.get("/logout", (req,res,next)=>{
    userController.logout(req,res,next);
});

//... user details by userId
userRoutes.get("/get-details/:userId",auth, (req,res,next)=>{
    userController.getOneUser(req,res,next);
});

//... get all users details
userRoutes.get("/get-all-details", auth, (req,res,next)=>{
    userController.getAllUser(req,res,next);
})

//... update user details
userRoutes.put("/update-details/:userId", auth, upload.single("avatar"), (req,res,next)=>{
    userController.updateUserDetails(req,res,next);
})


export default userRoutes;