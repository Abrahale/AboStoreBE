import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";

export interface ICartItem{
  id: mongoose.Schema.Types.ObjectId,
  product: mongoose.Schema.Types.ObjectId,
  qty:number,
  t_amnt:number,
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
  qty: {
    type: Number,
  },
  t_amnt: {
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

export const CartItem = mongoose.model<ICartItem>('CartItem',cartItemSchema);
