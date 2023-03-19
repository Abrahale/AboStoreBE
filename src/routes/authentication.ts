import express, { Request, Response } from "express";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { IUser, User } from "../models/user";
import {IAuthentication} from '../models/authentication'
import { Cart } from "../models/cart";
import asyncHandler from "express-async-handler"

export const authenticationRouter = express.Router();
authenticationRouter.use(express.json())

//BASIC AUTHENTICATION - Add JWT and properly implement it!
authenticationRouter.post('/',asyncHandler(async (req:Request,res:Response) =>{
  try{
      const userDetails = req?.body as IAuthentication;
      if(userDetails.email == null || userDetails.password == null )
        handleError(res,"Please, enter information to login",403);
      const result = await User.findOne({email:userDetails.email, password: userDetails.password}).exec();
      if(!result){
        handleError(res,'Either your email or password is incorrect!',403);
      }
      else{
        let r = await Cart.findOne({user:result.id}).exec();
        if(!r){
          const cart = new Cart({user:result.id, active:true, processed:false});
          r = await cart.save();
        }
        handleResponse(res,{id:result.id,email:result.email,userName:result.username, cartId:r?.id})
      }

  }
  catch(err){
    handleError(res,err);
  }
}))


