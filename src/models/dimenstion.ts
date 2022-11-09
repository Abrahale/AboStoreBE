import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IDimention {
  id: ObjectId,
  name: string,
  description: string,
  value:string,
  qty:number,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const dimentionSchema = new Schema<IDimention>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  value:{
    type:String,
    required:true
  },
  qty:{
    type:Number,
    required:true,
    default:0
  },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  deletedDate: { type: Date },
})

export const Dimention = mongoose.model<IDimention>('Dimention',dimentionSchema);

