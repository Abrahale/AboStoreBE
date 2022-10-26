import mongoose, { ObjectId, Schema } from "mongoose";

export interface ICategory {
  id: ObjectId,
  name: string,
  description: string,
  department:object,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const categorySchema =new Schema<ICategory>({
    name:{
      type: String,
      required: true,
    },
    description:{
      type: String,
    },
    department: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default:[]
    }],
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    deletedDate: { type: Date },
})

export const Category = mongoose.model<ICategory>("Category", categorySchema);



