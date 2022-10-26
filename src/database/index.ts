import mongoose from "mongoose";
import dotenv from "dotenv/config";

export const connect = async()=>{
    await mongoose.connect("mongodb+srv://ab_kiros:IB10q5NeNYvEF8hK@cluster0.uxlrogm.mongodb.net/test",{
        dbName:"abTest"
    },(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Database is connected")
        }
    });
}