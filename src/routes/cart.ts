import express, { Request, Response } from "express";
import { removeCartItem, updateCartitem, updateCartQty } from "../helpers/functions";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { Cart, ICart } from "../models/cart";
import { ICartItem } from "../models/cartItem";
import { IProduct, Product } from "../models/product";
import asyncHandler from "express-async-handler";
const ash = asyncHandler
export const cartRouter = express.Router();
cartRouter.use(express.json());

cartRouter.post("/id", ash(async (req: Request, res: Response) => {
  const id = req.body.id
  try {
    const query = { _id: req.body.id };
    const result = await Cart.findOne(query).populate({ path: 'cartItem', populate: { path: 'product', populate: { path: 'category', populate: { path: 'department' } } } }).exec();
    if (result) {
      handleResponse(res, result)
    }
  } catch (error) {
    handleError(res, `Unable to find matching document with id: ${req.query.id}`)
  }
}));

cartRouter.post("/add-to-cart", ash(async (req: Request, res: Response) => {
  const d = await getProductCart(req.body.cart,req.body.product)
    try {
      let ci_req = {
        product: req.body.product,
        qty: req.body.qty,
        t_amnt: req.body.qty * d.product.price,
        active: req.body.active,
      } as ICartItem
      let cart_req = {
        cartItem: updateCartitem(d.cart.cartItem,ci_req, d.product.price),
        user: req.body.user,
        total: d.cart.total + (req.body.qty * d.product.price),
        totalItems: d.cart.totalItems + req.body.qty,
        active: true,
        processed: false,
      } as unknown as ICart;
      const result = await Cart.findByIdAndUpdate(d.cart.id, cart_req).exec()
      if(result){
        const cart = await Cart.findOne(result._id).populate({ path: 'cartItem', populate: { path: 'product', populate: { path: 'category', populate: { path: 'department' } } } }).exec();
        handleResponse(res, cart)
      }
      else{
        handleError(res,`Sorry we facing technical issues:`,'I don\'t even know what the error is',400)
      }
    } catch (error) {
      handleError(res, `Sorry we facing techinal issues: ${error}`);
    }
  }
));

cartRouter.post("/updateQty",ash(async (req: Request, res: Response) => {
  const d = await getProductCart(req.body.cartId,req.body.product_id)
  const ress = updateCartQty(d.cart,d.product,req.body.inc);
  try{
     await Cart.findByIdAndUpdate(ress.cart.id, ress.cart).exec()
     const result = await Cart.findOne({id:ress.cart.id})
     .populate({ path: 'cartItem', populate: { path: 'product', populate: { path: 'category', populate: { path: 'department' } } } })
     .exec();
    handleResponse(res, result)
  }
 catch(error){
   handleError(res,`Sorry we facing techinal issues. Error: ${error}`);
 }
}));

cartRouter.post("/remove-from-cart",ash(async (req: Request, res: Response) => {
  const d = await getProductCart(req.body.cartId,req.body.product_id)
  if(!d) throw new Error(`There was an removing a cart-item: ${d}`)
  const ress = removeCartItem(d.cart,d.product);
  try{
     await Cart.findByIdAndUpdate(ress.cart.id, ress.cart).exec()
     const result = await Cart.findOne({id:ress.cart.id})
     .populate({ path: 'cartItem', populate: { path: 'product', populate: { path: 'category', populate: { path: 'department' } } } })
     .exec();
    handleResponse(res, result)
  }
 catch(error){
   handleError(res,`Sorry we facing techinal issues. Error: ${error}`);
 }
}));

const getProductCart = async (cart_id:string,pro_id:string):Promise<{product:IProduct,cart:ICart}> => {
  var pro_details;
  var cart_details;
  try {
    pro_details = await Product.findById(pro_id, ['price','quantity']).exec();
    cart_details = await Cart.findById(cart_id, ['cartItem', 'total', 'totalItems']).exec();
  }
  catch (e) {
    //need to send this exceptionless
    console.log( `There was an error. Error: ${e}`);
  }
  return {product:pro_details, cart:cart_details}
}

const getAccurateEstimate = async (cart_id:string,pro_id:string):Promise<{product:IProduct,cart:ICart}> => {
  var pro_details;
  var cart_details;
  try {
    pro_details = await Product.findById(pro_id, ['price','quantity']).exec();
    cart_details = await Cart.findById(cart_id, ['cartItem', 'total', 'totalItems']).exec();
  }
  catch (e) {
    //need to send this exceptionless
    console.log( `There was an error. Error: ${e}`);
  }
  return {product:pro_details, cart:cart_details}
}