import  asyncHandler  from 'express-async-handler';
import express from "express";
import { handleResponse } from "../middleware/response.middeware";
import sgMail from '@sendgrid/mail';

const ash = asyncHandler

export const emailerRouter = express.Router()
emailerRouter.use(express.json())

//update this later
emailerRouter.post('/mail', ash( async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { firstName, lastName, emailAddress, message } = req.body
  const msg = {
      to: process.env.TO_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: `${firstName } ${lastName}`,
      text: firstName + ' ' + lastName + ', ' + message,
      html: message,
    };
    
    sgMail
      .send(msg)
      .then(() => {
        handleResponse(res,{ message: 'Email sent' });
      }, error => {
        throw new Error(error)
  });
}));