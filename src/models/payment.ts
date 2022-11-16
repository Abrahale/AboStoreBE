import { ObjectId } from "mongodb";

export interface IPayment {
  id: ObjectId,
  order_id: ObjectId,
  amount:number,
  provider:string,
  status:string,
  description: string,
  createdDate: string,
  modifiedDate: string,
}
