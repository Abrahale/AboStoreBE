import { IUser } from './../user';
import { Request } from "express";

export interface AuthRequest extends Request{
    user:IUser
}