import { ObjectId } from "mongodb";

export interface IOrder {
  id: ObjectId,
  user_id: ObjectId,
  total:number,
  payment_id: ObjectId,
  description: string,
  active:boolean,
  createdDate: string,
  modifiedDate: string,
  deletedDate: string,
}
