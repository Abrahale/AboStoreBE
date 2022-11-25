import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface ICart {
  id: ObjectId,
  cartItem: mongoose.Schema.Types.ObjectId,
  user:mongoose.Schema.Types.ObjectId,
  total:number,
  totalItems:number,
  active:boolean,
  processed:boolean,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const cartSchema = new Schema<ICart>({
  cartItem: { type: Array, default: [] },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  total: {
    type: Number,
  },
  totalItems: {
    type: Number,
  },
  active:{
    type:Boolean,
    require:true,
    default:false
  },
  processed:{
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

export const Cart = mongoose.model<ICart>('Cart',cartSchema);
