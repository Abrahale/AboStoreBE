import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { Dimention } from "./dimenstion";

export interface IReview {
  id: ObjectId,
  name: string,
  description: string,
  user:mongoose.Schema.Types.ObjectId,
  product:mongoose.Schema.Types.ObjectId,
  rating:number,
  like:number,
  dislike:number,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const reviewSchema = new Schema<IReview>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  rating:{
    type:Number,
    required:true
  },
  like:{
    type:Number,
    required:true,
    default:0
  },
  dislike:{
    type:Number,
    required:true,
    default:0
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  deletedDate: { type: Date },
})

export const Review = mongoose.model<IReview>('Review',reviewSchema);

