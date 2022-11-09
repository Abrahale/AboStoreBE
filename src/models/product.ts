import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IProduct {
  id: ObjectId,
  productCode:string,
  title: string,
  sku: string,
  category: mongoose.Schema.Types.ObjectId,
  brand: mongoose.Schema.Types.ObjectId,
  manufacturer: mongoose.Schema.Types.ObjectId,
  quantity:number,
  available:boolean,
  inventory: mongoose.Schema.Types.ObjectId,
  price: number,
  discount: mongoose.Schema.Types.ObjectId,
  description: string,
  image:Object,
  rating:number,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const productSchema = new Schema<IProduct>({
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  quantity: { type: Number, required: true },
  image: { type: Array, required: true, default: [] },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default:[]
  }],
  brand: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    default:[]
  }],
  manufacturer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufacturer",
    default:[]
  }],
  available: {
    type: Boolean,
    required: true,
  },
  rating:{
    type:Number
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

export const Product = mongoose.model<IProduct>('Product',productSchema);
