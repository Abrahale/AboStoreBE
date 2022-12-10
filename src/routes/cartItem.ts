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
          result = await Cart.updateMany({id:cartInDb.id},{total:totals['total'],totalItems:totals['totalItems']})
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
    // let result;
    // if(r){
    //   cartReq.qty += r.qty;
    //   result = await CartItem.findByIdAndUpdate(r.id,cartReq).exec();
    //  // console.log(result)
    //   const t = await Cart.findByIdAndUpdate(cartReq.cart,{$inc:{totalItems:result?.qty},$sum:{$multiply:[result?.qty,result?.populate({path:'product',select:'price'})]}});
    //   console.log(t)
    // }
    // else{
    //   result = await cartItem.save();
    //   var itemInCart = await Cart.findOne({cartItem:result?.id}).exec();
    //   if(itemInCart){
    //     console.log('the item already exists in the cart')
    //   }
    //   else{
    //     console.log('the item donesn\'t exist in db, and the cartItem is -->', result)
    //     const cartR = await Cart.findByIdAndUpdate(cartReq.cart,{$push:{cartItem:result.id}}).exec();//Fix this so that it pushes only if it doesn't exist
    //     console.log('Cart response after update', cartR)
    //   }
    // }
   
    //  handleResponse(res,result)
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