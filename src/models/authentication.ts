import mongoose, { Schema } from "mongoose";

export interface IAuthentication {
  email:string;
  password:string;
}

const authenticationSchema = new Schema<IAuthentication>({
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})

export const Authentication = mongoose.model<IAuthentication>("Authentication",authenticationSchema)
