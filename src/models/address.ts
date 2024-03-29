import mongoose,{
    Schema
  } from 'mongoose';

const addressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  building: { type: String },
  floor: { type: String },
  apartment: { type: String },
  phoneNumber: { type: Number, required: true },
  postalCode: { type: Number, required: true },
  isPrimary: { type: Boolean }
});

export const Address = mongoose.model("Address", addressSchema);