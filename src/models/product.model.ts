import {
    Schema
  } from 'mongoose';
  import mongoose from 'mongoose';
  
  export interface IProduct {
    id: number | null;
    productName: string;
    productCode: string;
    productDescription?: string;
    productRating?: number;
}

  export const Product = new Schema<IProduct>({
    id: { type: mongoose.Schema.Types.ObjectId, required: false },
    productName: String,
    productCode: String,
    productDescription: String,
    productRating: Number,
  });

const products = mongoose.model("products", Product);
export default products;
