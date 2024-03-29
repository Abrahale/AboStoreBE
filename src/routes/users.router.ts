import  asyncHandler  from 'express-async-handler';
import express, { Request, Response } from "express";
import {IUser, User} from "../models/user";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { authMiddleWare } from '../middleware/authMiddleWare.middleware';
import { isValidObjectId } from '../utils/validateObjectId.utils';

const ash = asyncHandler
export const usersRouter = express.Router();
usersRouter.use(express.json());
usersRouter.get("/", ash(async (req: Request, res: Response) => {
    try {
      const users = await User.find({}).exec();
      handleResponse(res,users)
    } catch (error: any) {
        handleError(res,error)
    }
}));

usersRouter.get("/:",ash( async (req: Request, res: Response) => {
  const id = req.query.id;
  isValidObjectId(id)
      const result =  await User.findById({_id:id});
      if (result) {
        handleResponse(res,result)
      }
      else{
        throw new  Error(`User Not Found with id: ${id}`);
      }
  }
));
usersRouter.get("/delete/:",ash( async (req: Request, res: Response) => {
  const id = req.query.id;
  isValidObjectId(id)
      const result =  await User.findByIdAndDelete({_id:id});
      if (result != null) {
        console.log('what this supposed to return? ',result)
        try {
          const users = await User.find({}).exec();
          let responseObject = {message:"User deleted successfully",users:[...users]}
          handleResponse(res,users,"User deleted successfully")
        } catch (error: any) {
            handleError(res,error,"User deleted successfully, but there was an error getting list of users")
        }
      }
      else{
        throw new  Error(`User Not Found with id: ${id}`);
      }
  }
));

usersRouter.put("/update/:id",authMiddleWare, ash( async (req: Request, res: Response) => {
  const { id } = req.params;
  isValidObjectId(id)
  const user = req.body as IUser;
      const result =  await User.findByIdAndUpdate(id,user,{new:true,});
      if (result) {
        handleResponse(res,`User updated successfully: ${result}`)
      }
      else{
        throw new  Error(`User Not Found with id: ${id}`);
      }
  }
));

usersRouter.post("/", ash(async (req: Request, res: Response) => {
        const newUser = req.body as IUser;
        const user = new User(newUser);
        const findUser = await User.findOne({username:user.username, email:user.email})
        if(!findUser){
          const result = await user.save();
          if(result != null){
            try {
              const users = await User.find({}).exec();
              let responseObject = {message:"Successfully created a new user",users:[...users]}
              handleResponse(res,responseObject)
            } catch (error: any) {
                handleError(res,{message:"Successfully created a new user, but there was an error getting list of users",error:{...error}})
            }
          }
        }
        else{
          throw new Error(`User already exists`);
        }
    
}));
