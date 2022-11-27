import express, { Request, Response } from "express";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { Cart, ICart } from "../models/cart";
export const cartRouter = express.Router();
cartRouter.use(express.json());
// GET
cartRouter.get("/", async (_req: Request, res: Response) => {
  try {
    console.log('get / is running')
    const cart = await Cart.findOne().populate({path:'cartItem',populate:{path:'product', populate:{path:'category',populate:{path:'department'}}}}).exec();
    handleResponse(res,cart)
  } catch (error: any) {
      handleError(res,error)
  }
});

cartRouter.post("/id", async (req: Request, res: Response) => {
  const id = req.body.id
  try {
      const query = { _id: req.body.id  };
      const result = await Cart.findOne(query).populate({path:'cartItem',populate:{path:'product', populate:{path:'category',populate:{path:'department'}}}}).exec();
      if (result) {
        handleResponse(res,result)
      }
  } catch (error) {
    handleError(res,`Unable to find matching document with id: ${req.query.id}`)
  }
});
// POST
cartRouter.post("/", async (req: Request, res: Response) => {
  try {
    const cartReq = req.body as ICart;
    const cart = new Cart(cartReq);
    const result = await cart.save();
     handleResponse(res,`Successfully created a new cart with id ${result._id}`)
} catch (error) {
  handleError(res,`Failed to create a new cart. Error: ${error}`);
}
});

cartRouter.post("/update", async (req: Request, res: Response) => {
  const id = req.body.id
  try {
    const query = {_id:id}
    const result = await Cart.findOneAndUpdate(query, req.body).exec();
    if(result)
     handleResponse(res,`Successfully updated  cart with id ${result._id}`)
  } catch (error) {
  handleError(res,`Failed to update cart. Error: ${error}`);
}
});