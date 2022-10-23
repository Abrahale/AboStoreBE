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

    // const kittySchema = new mongoose.Schema({
    //     name:String
    // });

    // const kitten = mongoose.model('Kitten', kittySchema);

    // const silence = new kitten({name: 'Silence'})
    // console.log(silence.name)

    // kittySchema.methods.speak = function speak(){
    //     const greeting = this.name? "Meow name is " + this.name : "I don't have a name"
    //     console.log(greeting)
    // };

    // const Kitten = mongoose.model('Kitten', kittySchema)

    // const fluffy = new Kitten({name:'fluffy'})
    // //fluffy.speak();
    // await fluffy.save();
}