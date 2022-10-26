import { Request, Response } from "express";

export const handleResponse = (res:Response, data:any)=>{
  res.status(200).send({success:true, result:data});
}
export const handleError = (res:Response, err:any, value=400)=>{
  res.status(value).send({success:false, result:err});
}


