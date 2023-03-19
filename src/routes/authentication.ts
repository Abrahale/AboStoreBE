import { generateToken } from './../config/jwtToken';
import express, { Request, Response } from "express";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { IUser, User } from "../models/user";
import {IAuthentication} from '../models/authentication'
import { Cart } from "../models/cart";
import asyncHandler from "express-async-handler"
 const ash = asyncHandler
export const authenticationRouter = express.Router();
authenticationRouter.use(express.json())

//BASIC AUTHENTICATION - Add JWT and properly implement it!
authenticationRouter.post('/',ash(async (req:Request,res:Response) =>{

      const userDetails = req?.body as IAuthentication;
      if(userDetails.email == null || userDetails.password == null )
      throw new Error("Please, enter information to login")
      const findUser = await User.findOne({email:userDetails.email}).exec()
      if(findUser && await findUser.isPasswordMatched(userDetails.password)){
            let r = await Cart.findOne({user:findUser.id}).exec();
        if(!r){
          const cart = new Cart({user:findUser.id, active:true, processed:false});
          r = await cart.save();
        }
        handleResponse(res,{id:findUser.id,email:findUser.email,userName:findUser.username, cartId:r?.id, token:generateToken(findUser.id)})
      }
      else{
        throw new Error("Invlalid Credentials, please try again!")
      }
}))


