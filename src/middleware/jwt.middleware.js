import jwt from "jsonwebtoken";

//.. verificaton of user authentication
export const auth = async (req,res,next)=>{
    const {jwtToken} = req.cookies

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, data)=>{
        if(err){
            return res.status(400).send("UnAuthorized! login to continue")
        }else{
            req.userId = data.userId;
            next();
        }
    })
}