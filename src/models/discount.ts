import { ObjectId } from "mongodb";

export interface IDiscount {
  id: ObjectId,
  name: string,
  description: string,
  discount_percent:number,
  active:boolean,
  createdDate: string,
  modifiedDate: string,
  deletedDate: string,
}
