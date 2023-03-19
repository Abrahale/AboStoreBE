import mongoose from "mongoose";

export const isValidObjectId = (id) =>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error(`${id} is not a valid ObjectId`)
}