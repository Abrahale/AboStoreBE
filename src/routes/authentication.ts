import { authMiddleWare } from './../middleware/authMiddleWare.middleware';
import { User } from './../models/user';
import { generateToken } from './../config/jwtToken';
import { generateRefreshToken } from './../config/refreshToken';
import express, { Request, Response } from "express";
import { handleResponse, handleError } from "../middleware/response.middeware";
import {IAuthentication} from '../models/authentication';
import { Cart } from "../models/cart";
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../models/interfaces/request.interface';
import { isValidObjectId } from '../utils/validateObjectId.utils';
 const ash = asyncHandler
export const authenticationRouter = express.Router();
authenticationRouter.use(express.json())

//BASIC AUTHENTICATION - Add JWT and properly implement it!
authenticationRouter.post('/login',ash(async (req:Request,res:Response) =>{

      const userDetails = req?.body as IAuthentication;
      if(userDetails.email == null || userDetails.password == null )
      throw new Error("Please, enter information to login")
      const findUser = await User.findOne({email:userDetails.email}).exec()
      if(findUser && await findUser.isPasswordMatched(userDetails.password)){
        const refreshToken = generateRefreshToken(findUser.id);
        const updateUser = await User.findByIdAndUpdate(findUser.id,{refreshToken:refreshToken},{new:true})
        res.cookie('refreshToken',refreshToken, {
          httpOnly:true,
          maxAge:24 * 60 * 60 * 1000,
        })
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

authenticationRouter.get('/refreshToken',ash(async (req,res) => {
  const cookie = req.cookies
  if(!cookie?.refreshToken) throw new Error('No Refresh token in cookies')
  const refreshToken = cookie.refreshToken
  const user = await User.findOne({refreshToken})
  if(!user) throw new Error('Refresh token incorrect')
  jwt.verify(refreshToken, process.env.JWT_SECRET,(err,decoded) =>{
    if(err || decoded.id !== user.id) throw new Error('Token cannot be verified')  
    const newToken =   generateToken(decoded.id)
    handleResponse(res,newToken)
  })
}))


authenticationRouter.get('/logout',ash(async (req,res) => {
  const cookie = req.cookies
  if(!cookie?.refreshToken){
    throw new Error('No Refresh token in cookies')
  } 
  const refreshToken = cookie.refreshToken
  const user = await User.findOne({refreshToken})
  if(!user){
    res.clearCookie('refreshToken',{httpOnly:true, secure:true})
    handleResponse(res,'',204)
  }
  await User.findOneAndUpdate({refreshToken},{refreshToken:""})
  res.clearCookie('refreshToken',{httpOnly:true, secure:true})
  handleResponse(res,'',204)
}))

authenticationRouter.put('/reset-password',authMiddleWare,ash(async (req:AuthRequest,res)=>{
  const { _id } = req.user 
  const { password } = req.body
  isValidObjectId(_id)
  const user = await User.findById({_id})
  if(password){
    user.password = password;
    const updatedPassword = await user.save()
    handleResponse(res,updatedPassword)
  }
  else throw new Error('We need a password, to update too')
}))

