import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface ICartItem {
  id: ObjectId,
  product: mongoose.Schema.Types.ObjectId,
  user:mongoose.Schema.Types.ObjectId,
  qty:number,
  active:boolean,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const cartItemSchema = new Schema<ICartItem>({
  product: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  qty: {
    type: Number,
  },
  active:{
    type:Boolean,
    require:true,
    default:false
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
  deletedDate: {
    type: Date,
  },
});

export const Cart = mongoose.model<ICartItem>('Cart',cartItemSchema);
