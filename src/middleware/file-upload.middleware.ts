import asyncHandler  from 'express-async-handler';
import multer from 'multer'
import multerS3 from 'multer-s3'
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const ash =  asyncHandler
   export const s3 = new S3Client({
    credentials:{
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    },
    region: process.env.S3_REGION
   });

   const s3Storage = (bucketName:string = process.env.S3_BUCKET) => multerS3({
    s3:s3,
    bucket:bucketName,
    acl:"public-read",
    metadata:(req,file,cb) => {
        cb(null,{fieldname:file.fieldname})
    },
    key:(req,file,cb) => {
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname
        cb(null,fileName)
    }
   })

   const sanitizeFile = (file,cb) => {
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"]
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
   }

  export const uploadImage = multer({
    storage: s3Storage(),
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback)
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
   })

   export const deleteFile = async(key:string, bucket:string = process.env.S3_BUCKET ) => {
    return new Promise((resolve, reject) => {
        const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key:key
        })
        s3.send(command).then(response =>{
            console.log(response)
            resolve(response)

        })
        .catch(err =>{
            console.error(err)
            reject(err)
        })
    })
   }


