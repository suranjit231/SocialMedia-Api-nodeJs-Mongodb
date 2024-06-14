import mongoose from "mongoose";
import nodemailer from "nodemailer";
import userModel from "../users/userSchema.js";
import otpGenerator from "otp-generator";
import otpModel from "./otpSchema.js";

export default class OtpRepositry{
    async sendOtp(userId){
        try{
            const user = await userModel.findById(userId);
             if(!user){
                throw new Error("user not found");
             }
        //.. if user  found create transpost for sending otp in email
    const otp= otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASS,
            }
        });

        //.. create options for sending sending otp via email
        const mailOptions = {
            from:process.env.EMAIL,
            to:user.email,//.... it will replaced by user actual email id
           // to:user.email,
            subject:"Password reset OTP",
            text: `Your OTP for password reset is: ${otp}`
            

        }
        //.. send mail
        await transporter.sendMail(mailOptions);
        console.log("OTP email sent successfully");
         //. check is there any existing otp of user
        const existingOtp =await otpModel.findOne({ user: user._id });
        console.log("find existing OTP: ", existingOtp)

        if(!existingOtp){
            const newOtp = new otpModel({
                otp:otp,
                status:"send",
                user:user._id,
            });
    
            await newOtp.save();

        }else{
                existingOtp.otp = otp;
                existingOtp.status = "send";
                await existingOtp.save();
        }

        

        return {success:true, msg:"OTP sends your regester email ID"}
        }catch(error){
            console.log("Error sending OTP email: ", error);
            throw error;
        }
        
    };

    //.... verify the otp
    async verifyOtp(userId, otp){
        try{
            const existingOtp = await otpModel.findOne({user:userId});

            if(!existingOtp){
                throw new Error("OTP not found for the user or OTP expired please resend OTP!");
            }

            //.. if otp found then verify the otp
            if(existingOtp.otp===otp){
                existingOtp.status = "verified";
                await existingOtp.save();

                return {success: true, msg: "OTP verified successfully"};
            }else {
                throw new Error("Invalid OTP");
            }


        }catch(error){
            console.log("Error verifying OTP: ", error);
            throw error;
        }
    }

    //.... after verifyed otp reset the password
    async resetPassword(userId, newPassword){
        try{
            const existingOtp = await otpModel.findOne({user:userId});
            if(!existingOtp){
                throw new Error("Please verify your credential to reset the password");
            }

            //... if user otp status is veifyed then update the password
            if(existingOtp.status=="verified"){
               const userData= await userModel.findById(userId);
               console.log("userData:", userData);

               userData.password = newPassword;
               await userData.save();
               await otpModel.findOneAndDelete({user:userId});

               return {success:true, msg:"Your password update sucessfully"};
            }

             //... if user otp status is send then send a message for verifu the otp
            if(existingOtp.status=="send"){
                return {success:false, msg:"Please verify your otp"};
            }

        }catch(error){
            console.log("Error reset password: ", error);
            throw error;
        }
    }



}
