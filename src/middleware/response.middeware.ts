import { Request, Response } from "express";

export const handleResponse = (res:Response, data:any, status=200)=>{
  res.status(status).send(data);
}
export const handleError = (res:Response, err:any, value=400)=>{
  res.status(value).send({success:false, result:err});
}


