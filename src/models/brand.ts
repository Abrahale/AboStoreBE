import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IBrand {
  id: ObjectId,
  name:string,
  description: string,
  product: mongoose.Schema.Types.ObjectId,
  category: mongoose.Schema.Types.ObjectId,
  manufacturer: mongoose.Schema.Types.ObjectId,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const brandSchema = new Schema<IBrand>({
  name: {
    type: String,
    required: true,
  },
  product: { type: Array, default: [] },
  description: {
    type: String
  },

  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default:[]
  }],
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufacturer"
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

export const Brand = mongoose.model<IBrand>('Brand',brandSchema);
