import express, { Request, Response } from "express";
import {  s3, uploadImage, deleteFile } from "../middleware/file-upload.middleware";
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { listS3Files } from "../helpers/functions";
import { handleError, handleResponse } from "../middleware/response.middeware";

export const fileUploadRouter = express.Router()

fileUploadRouter.post('/upload',async(req:Request,res:Response) => {
        const uploadSingle = uploadImage.single("image")
        console.log(req.file)
        uploadSingle(req,res,err => {
            if(err){
                handleError(res,`Failed to upload image ${err}`)
            }
            else{
                handleResponse(res,{message:"sucessfully uploaded image", key:req.file['key']})
            }
        })
})

fileUploadRouter.get('/get-files',async (req,res)=>{
    const result = await listS3Files(s3,process.env.BUCKET_NAME)
    // const result = await s3.send(new ListObjectsV2Command(params));
    res.send({images:result})
})

fileUploadRouter.post('/delete-file', async(req,res)=>{
    await deleteFile(req.body.key).then(response =>{
        handleResponse(res,response)

    }).catch(err =>{
        handleError(err,"Failed to delete file")
    })
})