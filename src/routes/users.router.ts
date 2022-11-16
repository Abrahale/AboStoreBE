import express, { Request, Response } from "express";
import {IUser, User} from "../models/user";
import { handleResponse, handleError } from "../middleware/response.middeware";
export const usersRouter = express.Router();
usersRouter.use(express.json());
usersRouter.get("/", async (req: Request, res: Response) => {
    try {
      const users = await User.find({}).exec();
      handleResponse(res,users)
    } catch (error: any) {
        handleError(res,error)
    }
});

usersRouter.get("/:", async (req: Request, res: Response) => {
    const id = req.query.id;
    try {
        const query = { _id: id };
        const result =  await User.findById(query).exec();
        if (result) {
          handleResponse(res,result)
        }
    } catch (error) {
      handleError(res,`Unable to find matching document with id: ${req.query.id}`)
    }
});
usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newUser = req.body as IUser;
        const user = new User(newUser);
        const result = await user.save();
        handleResponse(res,`Successfully created a new user with id ${result._id}`)
    } catch (error) {
      handleError(res,`Failed to create a new user. Error: ${error}`);
    }
});
