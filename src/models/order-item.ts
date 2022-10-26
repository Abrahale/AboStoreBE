import { ObjectId } from "mongodb";

export interface IOrderItem {
  id: ObjectId,
  order_id: ObjectId,
  product_id: ObjectId,
  quantity:number,
  description: string,
  createdDate: string,
  modifiedDate: string,
}
