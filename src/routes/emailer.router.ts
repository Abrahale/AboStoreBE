import  asyncHandler  from 'express-async-handler';
import express, { Request, Response } from "express";
import {IUser, User} from "../models/user";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { authMiddleWare } from '../middleware/authMiddleWare.middleware';
import { isValidObjectId } from '../utils/validateObjectId.utils';
import nodemailer from 'nodemailer';

const ash = asyncHandler

export const emailerRouter = express.Router()
emailerRouter.use(express.json())

emailerRouter.get('/',ash(async (req,res)=>{
    console.log('I am here!')
      // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "abrahalekiros@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  handleResponse(res,{info,nodemailer})
}
))