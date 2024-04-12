import express from "express";
import OtpController from "./otpSend.controller.js";

const otpRoutes = express.Router();
const otpController = new OtpController();

//... get OTP for reset password
otpRoutes.get("/send", (req,res,next)=>{
    otpController.sendOTP(req,res,next);
});


//... verify the otp
otpRoutes.post("/verify", (req,res,next)=>{
    otpController.verifyOTP(req,res,next);
});

//... after verifyed otp reset the password
otpRoutes.post("/reset-password", (req,res,next)=>{
    otpController.resetPassword(req,res,next);
});



export default otpRoutes;