import  asyncHandler  from 'express-async-handler';
import express, { Request, Response } from "express";
import {IUser, User} from "../models/user";
import { handleResponse, handleError } from "../middleware/response.middeware";
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
      const result =  await User.findById({_id:id});
      if (result) {
        handleResponse(res,result)
      }
      else{
        throw new  Error(`User Not Found with id: ${id}`);
      }
  }
));
usersRouter.get("/delete:",ash( async (req: Request, res: Response) => {
  const id = req.query.id;
      const result =  await User.findByIdAndDelete({_id:id});
      if (result) {
        handleResponse(res,'User deleted successfully')
      }
      else{
        throw new  Error(`User Not Found with id: ${id}`);
      }
  }
));

usersRouter.put("/update/:id",ash( async (req: Request, res: Response) => {
  const { id } = req.params;
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
          handleResponse(res,`Successfully created a new user:  ${result}`)

        }
        else{
          throw new Error(`User already exists`);
        }
    
}));
