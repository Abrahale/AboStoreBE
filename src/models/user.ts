import moongose, { Schema, model, connect } from 'mongoose';

export interface IUser {
    username:string,
    first_name:string;
    last_name?:string;
    email:string;
    password:string;
    telephone?:string;
    createdDate?: Date;
    modifiedDate?: Date;
}

const userSchema = new Schema<IUser>({
  username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    first_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 5,
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
        minlength: 5,
        maxlength: 1024
    },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
})

export const User = moongose.model<IUser>("user", userSchema);
