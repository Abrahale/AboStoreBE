import asyncHandler  from 'express-async-handler';
import jwt from 'jsonwebtoken'
import { User } from '../models/user';
const ash =  asyncHandler

export const authMiddleWare = ash(async (req,res,next) =>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
        try{
            if(token){
                const decode = jwt.verify(token,process.env.JWT_SECRET)
                const user = await User.findById(decode.id)
                req['user'] = user;
                next()
            }
        }
        catch(err){
            throw new Error("Token is expired, please try again!")
        }
    }
    else{
        throw new Error("There is no token attached!")
    }
})