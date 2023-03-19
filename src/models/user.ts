import moongose, { Schema, model, connect } from 'mongoose';
import bcrypt from "bcrypt"
export interface IUser {
    username:string,
    first_name:string;
    last_name?:string;
    email:string;
    password:string;
    mobile?:string;
    telephone?:string;
    createdDate?: Date;
    modifiedDate?: Date;

    isPasswordMatched(input:string):boolean;
}

const userSchema = new Schema<IUser>({
  username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    first_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
})

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.isPasswordMatched = async function(enteredPassword:string){
    return await bcrypt.compare(enteredPassword,this.password)
}

export const User = moongose.model<IUser>("User", userSchema);
