import express, { Request, Response } from "express";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { User } from "../models/user";
import {IAuthenticationModel} from '../models/authenticationModel'

export const authenticationRouter = express.Router();
authenticationRouter.use(express.json())

//BASIC AUTHENTICATION - Add JWT and properly implement it!
authenticationRouter.post('/',async (req:Request,res:Response) =>{
  try{
      const userDetails = req?.body as IAuthenticationModel;
      if(userDetails.email == null || userDetails.password == null )
        handleError(res,"Please, enter information to login",403);
      const result = await User.find({email:userDetails.email, password: userDetails.password}).exec();
      if(result.length == 0){
        handleError(res,'Either your email or password is incorrect!',403);
      }
      else{
        handleResponse(res,"Logged in successfully")
      }

  }
  catch(err){
    handleError(res,err);
  }
})
