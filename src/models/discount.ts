import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IDiscount {
  id: ObjectId,
  name: string,
  description: string,
  discount_percent:number,
  discount_amount:number,
  active:boolean,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const discountSchema = new Schema<IDiscount>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  discount_percent:{
    type:Number,
    required:true,
    default:0
  },
  discount_amount:{
    type:Number,
    required:true,
    default:0
  },
  active:{
    type:Boolean,
    require:true,
    default:false
  },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  deletedDate: { type: Date },
})

export const Discount = mongoose.model<IDiscount>('Discount',discountSchema);

