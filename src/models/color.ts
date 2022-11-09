import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { Dimention } from "./dimenstion";

export interface IColor {
  id: ObjectId,
  name: string,
  description: string,
  size:mongoose.Schema.Types.ObjectId,
  dimention:mongoose.Schema.Types.ObjectId,
  hex:string,
  rgb:string,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const colorSchema = new Schema<IColor>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  hex:{
    type:String,
    required:true
  },
  rgb:{
    type:String,
    required:true
  },
  size:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Size",
    default:[]
  }],
  dimention:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Size",
    default:[]
  }],
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  deletedDate: { type: Date },
})

export const Color = mongoose.model<IColor>('Color',colorSchema);

