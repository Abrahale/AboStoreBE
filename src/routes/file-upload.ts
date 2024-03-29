import express, { Request, Response } from "express";
import {  s3, uploadImage, deleteFile } from "../middleware/file-upload.middleware";
import { listS3Files } from "../helpers/functions";
import { handleError, handleResponse } from "../middleware/response.middeware";
import dotenv from 'dotenv';
import { fileDeletionEmitter } from "../classes/EventEmitters";
dotenv.config();
export const fileUploadRouter = express.Router()

fileUploadRouter.post('/upload',async(req:Request,res:Response) => {
        const uploadSingle = uploadImage.single("image")
        uploadSingle(req,res,err => {
            if(err){
                handleError(res,`Failed to upload image ${err}`)
            }
            else{
                //This needs to be updated
                handleResponse(res,{message:"sucessfully uploaded image", key:req.file['key']})
            }
        })
})

fileUploadRouter.get('/get-files',async (req,res)=>{
    try{
        const result = await listS3Files(s3,process.env.S3_BUCKET)
        handleResponse(res,result)
    }
    catch(err){
        handleError(res, err)
    }
})

fileUploadRouter.post('/delete-file', async(req,res)=>{
    await deleteFile(req.body.key).then(response =>{
                        const fileId = req.body.key; 
                        fileDeletionEmitter.emitFileDeletedEvent(fileId);
        handleResponse(res,response)

    }).catch(err =>{
        handleError(err,"Failed to delete file")
    })
})