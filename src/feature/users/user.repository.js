import mongoose from "mongoose";
import userModel from "./userSchema.js"
import bcrypt from "bcrypt";


//......user repository class
export default class UserRepository{
      // Method to remove password field from user object
      removePasswordField(user) {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    }

    //.. methods for user register
    async userRegister(userData){
        try{
            console.log(userData);
            const user =await userModel.findOne({email:userData.email});
        if(user){
            console.log("console user ", user);
            throw new Error("User already register")
        }
        const newUser = new userModel(userData);
        const savedUser = await newUser.save();
        return this.removePasswordField(savedUser);
       // return savedUser;

        }catch(error){
            console.log("signup repository ",error);
            if(error instanceof mongoose.Error.ValidationError){
                throw error;
            }else{
                throw new Error("somethng went wrong please try later")
            }
        }
        
    }

    //.. methods for user login 
    async userLogin(email, password){
        try{
            console.log(email,password);
            const user =await userModel.findOne({email:email});
          console.log("user login console repo: ",user);
            if(!user){
                throw new Error("User not found");
            }
    
           const comporedResult=await bcrypt.compare(password, user.password);
           if(!comporedResult){
            throw new Error("invalid user credential");
           }
           const userWithoutPassword = {
            _id: user._id,
            email: user.email,
            gender:user.gender,
           
        };

    
           return userWithoutPassword;
    
        }catch(error){
            throw new Error(error.message)
        }
       
    }

    //.....get userBy id
    async getUserById(userId){
        try{

        
            const user = await userModel.findById(userId).select('-password')
            if(!user){
                throw new Error("user not found");
            }else{
                return user;
            }


        }catch(error){
            console.log(error);
            throw error;
        }
       
    }


    //... update userdetails
    async updateDetails(userId, filteredUpdates){
        try{
            const user = await userModel.findById(userId).select('-password');

            if(!user){
                throw new Error("user not found");
            }

            for(const key in filteredUpdates){
                user[key] = filteredUpdates[key];
            }

           await user.save();
           return {success:true,msg:"user-details updated", user};

        }catch(error){
            console.log("Update error:", error);
            throw new Error(error.message)
        }
    }

    async getAllUser(){
        try{
           const users= await userModel.find().select('-password');
            return users;
        }catch(error){
            console.log("Get all user error: ")
            throw new Error("something went wrong please try later")
        }
    }

}

