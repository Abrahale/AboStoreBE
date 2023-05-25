import express, { Request, Response } from "express";
import { IProduct, Product} from "../models/product";
import { handleResponse, handleError } from "../middleware/response.middeware";
import  asyncHandler  from 'express-async-handler';
export const productsRouter = express.Router();
const ash = asyncHandler
productsRouter.use(express.json());
// GET
productsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const products = await Product.find({}).exec(); 
    handleResponse(res,products)
  } catch (error: any) {
      handleError(res,error)
  }
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
      const query = { _id: id };
      const result =  await Product.findById(query).exec();
      if (result) {
        handleResponse(res,result)
      }
  } catch (error) {
    handleError(res,`Unable to find matching document with id: ${req.query.id}`)
  }
});
productsRouter.post("/update", async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
      const query = { _id: id };
      const result =  await Product.findOneAndUpdate(query,req.body).exec();
      if (result) {
        handleResponse(res,result)
      }
  } catch (error) {
    handleError(res,`updating the product: ${req.query.id}`)
  }
});
// POST
productsRouter.post("/", ash(async (req: Request, res: Response) => {
  try {
    const newProduct = req.body as IProduct;
    const product = new Product(newProduct);
    const result = await product.save();
    let responseObject = {message:"Successfully added a product",product:result}
    handleResponse(res,responseObject)
} catch (error) {
  handleError(res,{message:`Failed to create a new product.`, error:{...error}});
}
}));

// productsRouter.post("delete:",ash(async(req:Request, res:Response) =>{
//   try{
    
//   }
// }))

