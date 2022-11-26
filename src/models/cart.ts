import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface ICart {
  id: ObjectId,
  cartItem: Schema.Types.ObjectId,
  user:Schema.Types.ObjectId,
  total:number,
  totalItems:number,
  active:boolean,
  processed:boolean,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const cartSchema = new Schema<ICart>({
  cartItem: [{ type: Schema.Types.ObjectId,ref:"CartItem"  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  total: {
    type: Number,
    default:0
  },
  totalItems: {
    type: Number,
    default:0
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

// cartSchema.virtual('totalItemsCount').get(function () {
//   return this.cartItem
// });

export const Cart = mongoose.model<ICart>('Cart',cartSchema);
