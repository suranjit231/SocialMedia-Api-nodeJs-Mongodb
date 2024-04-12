import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//.. user controller class
export default class UserController{
    constructor(){
        this.userRepositiory = new UserRepository();
    }

    //.. user register contoller methods
    async userRegisterController(req,res,next){
        try{
            console.log(req.body);
            //.. checking strong password validation
            let password = req.body.password;
            console.log(req.body);
            const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!strongPasswordRegex.test(password)) {
                return res.status(400).send("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            }

            password =await bcrypt.hash(password, 12);
           const user= await this.userRepositiory.userRegister({...req.body, password});
           res.status(201).send(user);

        }catch(error){
            console.log("signup controller ",error);
            res.status(400).send(error.message)
        }
    }

    //.... user login controller
    async userLoginController(req,res,next){
        try{
            const {email,password} = req.body;
           
            const user =await this.userRepositiory.userLogin(email,password);
            if(!user){
                return res.status(400).send("invalid user credential");

            }else{
              const token=jwt.sign({
                   userId:user._id,
                   email:user.email
                  }, process.env.JWT_SECRET, { expiresIn: '2h' });

                return res.status(200)
                .cookie("jwtToken", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
                .send({sucess:true,user,token});
            }

        }catch(error){
            console.log("login controller ",error);
            res.status(400).send(error.message)
        }
    }

    //.. get one user-details by id
    async getOneUser(req,res,next){
        try{
            const userId = req.params.userId;
          const user= await this.userRepositiory.getUserById(userId);
          res.status(200).send(user);


        }catch(error){
            console.log("getOneUser controller ",error);
            res.status(400).send(error.message)
        }
    }

    //...... user logout controller
    async logout(req,res,next){
        try {
            // Clear the cookie named 'yourCookieName'
            res.clearCookie('jwtToken').status(200).send("logout sucessful");
    
            
            //res.redirect('/login'); 
        } catch (error) {
            next(error); // Pass any errors to the error handling middleware
        }
    }

    //..... update user details
    async updateUserDetails(req,res,next){
        try{
            const userId = req.userId;
            const updates = req.body;
            console.log("userId :", userId)

            const filteredUpdates = {};
            if(req.file){
                filteredUpdates["avatar"] = req.file.filename;
            };

            for(const key in updates){
                console.log("key console: ", key);
                if(key !== 'email' && key !== 'password' && key !== 'avatar'){
                    filteredUpdates[key] = updates[key];
                }
            }

            console.log(filteredUpdates);

           const result= await this.userRepositiory.updateDetails(userId, filteredUpdates);
           if(result.success){
                res.status(200).send(result);
           }
        }catch(error){
            console.log("update-details controller ",error);
            res.status(400).send(error.message);
        }
    }


    //..... get all user
    async getAllUser(req,res,next){
        try{
            const users = await this.userRepositiory.getAllUser();
            res.status(200).send(users);

        }catch(error){
            throw new Error("something went wrong please try later")
        }
    }
}