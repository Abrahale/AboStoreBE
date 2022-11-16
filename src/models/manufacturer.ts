import mongoose from "mongoose";
import { baseModel } from "./base.model";

export interface IManufacturer extends baseModel {
    name:string,
    tel:string,
    email:string,
    website:string,
    address:mongoose.Schema.Types.ObjectId,
    
}

const manufacturerSchema = new mongoose.Schema<IManufacturer>({
    name:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    website:{
        type:String
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    deletedDate: { type: Date },
})

export const Manufacturer = mongoose.model("Manufacturer",manufacturerSchema);