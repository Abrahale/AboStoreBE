import { ObjectId } from 'mongoose';
import moongose, { Schema, model, connect } from 'mongoose';
import bcrypt from "bcrypt"
import crypto from "crypto"
export interface IUser {
    _id:ObjectId | string,
    username:string,
    first_name:string;
    last_name?:string;
    email:string;
    password:string;
    mobile?:string;
    telephone?:string;
    createdDate?: Date;
    modifiedDate?: Date;
    refreshToken?:string;

    //For password resets
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;

    //Methods
    isPasswordMatched(input:string):boolean;
    createPasswordRestToken():string;
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
    refreshToken: {
        type: String,
    },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) next()
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.isPasswordMatched = async function(enteredPassword:string){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.createPasswordRestToken =async function() {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000 //I think this is 30 minutes
    return resetToken
}

export const User = moongose.model<IUser>("User", userSchema);
