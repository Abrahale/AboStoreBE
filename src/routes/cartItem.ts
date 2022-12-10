import express, { Request, Response } from "express";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { Cart } from "../models/cart";
import { ICartItem, CartItem } from "../models/cartItem";
import { getTotalItemsAndCount } from "../helpers/functions";
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
    let cart = new Cart;
    //check if cart-item exists
    try{
      let result;
      let r = await CartItem.findOne({product:cartReq.product, active:true, user:cartReq.user}).exec();
     // console.log('existing cart item',r)
      if(r !== null){
        try{
           await CartItem.updateOne({id:r.id,product:r.product},{qty:r.qty + cartReq.qty}).exec();
       // console.log('result',updateCartItem)
        }
        catch(error){
          handleError(res,`Failed to update cart-item. Error: ${error}`);
        }
      }
      else{
        result = await cartItem.save();
        var itemInCart = await Cart.findOne({cartItem:result?.id}).exec();
        if(itemInCart == null){
          const cartR = await Cart.findByIdAndUpdate(cartReq.cart,{$push:{cartItem:result.id}}).exec();
        }
      }
      try{
        const cartInDb = await Cart.findOne({id:cartReq.cart,user:cartReq.user, active:true,processed:false }).populate({path:'cartItem',select:'qty',populate:{path:'product',select:['price','quantity']}}).exec();
       // console.log('current cart', cartInDb)
        if(cartInDb){
          let totals = getTotalItemsAndCount(cartInDb.cartItem)
          result = await Cart.updateMany({id:cartInDb.id},{total:totals['total'],totalItems:totals['totalItems']}).exec();
        }
        else{
          return res.status(401).send({error:'No cart on session'});  
        }
      }
      catch (error) {
        handleError(res,`Failed to get session cart. Error: ${error}`);
      }
        if(result.acknowledged){
          result = await Cart.findOne({id:cartReq.cart,user:cartReq.user, active:true,processed:false }).populate({path:'cartItem',populate:{path:'product'}}).exec();
          handleResponse(res,result)
        }
        else{
          handleError(res,`Error getting you cart:`);
        }
    }
    catch (error) {
      handleError(res,`Error adding cart item. Error: ${error}`);
    }
} catch (error) {
  handleError(res,`Failed to create a new cart item. Error: ${error}`);
}
});
cartItemRouter.post("/updateQty", async (req: Request, res: Response) => {
  //PLEASE REFACTOR - this looks embaressing!!!
  try{
    const re = await CartItem.updateOne({id:req.body['cartItem_id'],product:req.body['product_id']},{$inc:{qty:req.body['inc']?+1:-1}}).exec();
    const cartInDb = await Cart.findOne({id:req.body['cartId'], active:true,processed:false }).populate({path:'cartItem',select:'qty',populate:{path:'product',select:['price','quantity']}}).exec();
    let totals = getTotalItemsAndCount(cartInDb.cartItem)
    let a = await Cart.updateMany({id:cartInDb.id},{total:totals['total'],totalItems:totals['totalItems']}).exec();
    const result = await Cart.findOne({id:req.body['cartId']}).populate({path:'cartItem',populate:{path:'product', populate:{path:'category',populate:{path:'department'}}}}).exec();
    if (result) {
      handleResponse(res,result)
    }
  }
 catch(error){
   handleError(res,`Failed to update cart-item. Error: ${error}`);
 }
});
cartItemRouter.post("/delete", async (req: Request, res: Response) => {
  //Need to implement this!!!
  try{
    const re = await CartItem.updateOne({id:req.body['cartItem_id'],product:req.body['product_id']},{$inc:{qty:req.body['inc']?+1:-1}}).exec();
    const cartInDb = await Cart.findOne({id:req.body['cartId'], active:true,processed:false }).populate({path:'cartItem',select:'qty',populate:{path:'product',select:['price','quantity']}}).exec();
    let totals = getTotalItemsAndCount(cartInDb.cartItem)
    let a = await Cart.updateMany({id:cartInDb.id},{total:totals['total'],totalItems:totals['totalItems']}).exec();
    const result = await Cart.findOne({id:req.body['cartId']}).populate({path:'cartItem',populate:{path:'product', populate:{path:'category',populate:{path:'department'}}}}).exec();
    if (result) {
      handleResponse(res,result)
    }
  }
 catch(error){
   handleError(res,`Failed to update cart-item. Error: ${error}`);
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