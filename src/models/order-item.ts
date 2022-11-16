import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IOrderItem {
  id: ObjectId,
  order: mongoose.Schema.Types.ObjectId,
  product: mongoose.Schema.Types.ObjectId,
  qty:number,
  comment: string,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const oderItemSchema = new Schema<IOrderItem>({
  order:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },
  qty:{
    type:Number,
    required:true,
    default:0
  },
  comment:{
    type:String,
    required:true
  },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  deletedDate: { type: Date },
})