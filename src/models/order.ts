import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IOrder {
  id: ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  qty:number,
  payment: mongoose.Schema.Types.ObjectId,
  active:boolean,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const orderSchema = new Schema<IOrder>({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Size"
  },
  qty:{
    type:Number,
    required:true,
    default:0
  },
  active:{
    type:Boolean,
    require:true,
    default:false
  },
  payment:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    default:[]
  }],
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  deletedDate: { type: Date },
})

export const Order =  mongoose.model<IOrder>("Order",orderSchema)

