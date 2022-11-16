import mongoose, { ObjectId, Schema } from "mongoose";

export interface IDepartment {
  id: ObjectId,
  name: string,
  description: string,
  createdDate: Date,
  modifiedDate: Date,
  deletedDate: Date,
}

const departmentSchema =new Schema<IDepartment>({
    name:{
      type: String,
      required: true,
    },
    description:{
      type: String,
    },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    deletedDate: { type: Date },
})

export const Department = mongoose.model<IDepartment>("Department", departmentSchema);

//TODO
//add mongoose paginate