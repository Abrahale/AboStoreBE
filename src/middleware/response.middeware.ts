import { Request, Response } from "express";

export const handleResponse = (res:Response, data:any, message='',status=200)=>{
  res.status(status).send({success:true, result:data, message});
}
export const handleError = (res:Response, err:any, message='',status=400)=>{
  res.status(status).send({success:false, result:err, message});
}


