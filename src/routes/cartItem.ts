import express, { Request, Response } from "express";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { Cart } from "../models/cart";
import { ICartItem, CartItem } from "../models/cartItem";
export const cartItemRouter = express.Router();
cartItemRouter.use(express.json());
// GET
cartItemRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const cart = await CartItem.find({}).exec();
    handleResponse(res,cart)
  } catch (error: any) {
      handleError(res,error)
  }
});

cartItemRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
      const query = { _id: id };
      const result =  await CartItem.findById(query).exec();
      if (result) {
        handleResponse(res,result)
      }
  } catch (error) {
    handleError(res,`Unable to find matching cart item with id: ${req.query.id}`)
  }
});
// POST
cartItemRouter.post("/", async (req: Request, res: Response) => {
  try {
    const cartReq = req.body as ICartItem;
    const cartItem = new CartItem(cartReq);
    console.log(cartReq)
    //check if product exists
    let r = await CartItem.findOne({product:cartReq.product, active:true, user:cartReq.user}).exec();
    let result;
    if(r){
      console.log('Item already exists in cart')
      cartReq.qty += r.qty;
      result = await CartItem.findByIdAndUpdate(r.id,cartReq).exec();
    }
    else{
      console.log('Item does not exist')
      result = await cartItem.save();
    }
   
   const cartR = await Cart.findByIdAndUpdate(cartReq.cart,{$push:{cartItem:result}}).populate({path:'user'}).populate('cartItem').exec();
     handleResponse(res,cartR)
} catch (error) {
  handleError(res,`Failed to create a new cart item. Error: ${error}`);
}
});

cartItemRouter.post("/update", async (req: Request, res: Response) => {
  const id = req.body.id
  try {
    const query = {_id:id}
    const result = await CartItem.findOneAndUpdate(query, req.body).exec();
    if(result)
     handleResponse(res,`Successfully updated  cart item with id ${result._id}`)
  } catch (error) {
  handleError(res,`Failed to update cart item. Error: ${error}`);
}
});