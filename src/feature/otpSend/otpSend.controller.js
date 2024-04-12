import OtpRepositry from "./otpSend.repository.js";
import bcrypt from "bcrypt";
export default class OtpController{
    constructor(){
        this.otpRepository = new OtpRepositry();
    }

    //... sends otp controller

    async sendOTP(req,res,next){
        try{
            const userId = req.userId;
            const result = await this.otpRepository.sendOtp(userId);

            if(result.success){
                return res.status(200).send(result.msg);
            }

        }catch(error){
            console.log(error);
            throw new Error(error.message);
        }
       
    }

    //.. verify the otp
    async verifyOTP(req,res,next){
        try{
            const userId = req.userId;
            let otp = req.body.otp;
            otp = Number(otp);
            const result = await this.otpRepository.verifyOtp(userId, otp);

            if(result.success){
                return res.status(200).send(result);
            }

        }catch(error){
            console.log(error);
            throw new Error(error.message);
        }
    };

    //...... reset the user password
    async resetPassword(req,res,next){
        try{
            const userId = req.userId;
             let password = req.body.password;

             const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
             if (!strongPasswordRegex.test(password)) {
                 return res.status(400).send("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
             }
 
             password =await bcrypt.hash(password, 12);

            const result= await this.otpRepository.resetPassword(userId,password);
            if(!result.success){
                return res.status(400).send(result);
            }

            return res.status(200).send(result);

        }catch(error){
            console.log(error);
            throw new Error(error.message)
        }
        
    }
}