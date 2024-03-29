import express, { Request, Response } from "express";
import { IProduct, Product} from "../models/product";
import { handleResponse, handleError } from "../middleware/response.middeware";
import  asyncHandler  from 'express-async-handler';
import { isValidObjectId } from "../utils/validateObjectId.utils";
import { fileDeletionEmitter } from "../classes/EventEmitters";
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

productsRouter.get("/:id",ash(async (req: Request, res: Response) => {
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
}));
productsRouter.post("/update", ash(async (req: Request, res: Response) => {
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
}));
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

productsRouter.get("/delete/:",ash( async (req: Request, res: Response) => {
  const id = req.query.id;
  isValidObjectId(id)
      const result =  await Product.findByIdAndDelete({_id:id});
      if (result != null) {
        try {
          const products = await Product.find({}).exec();
          let responseObject = {message:"Product deleted successfully",products:[...products]}
          handleResponse(res,responseObject)
        } catch (error: any) {
            handleError(res,{message:"Product deleted successfully, but there was an error getting list of departments",error:{...error}})
        }
      }
      else{
        handleError(res,`Product Not Found with id: ${id}`);
      }
  }
));


  fileDeletionEmitter.on('fileDeleted', async (fileId) => {
     const result =  await Product.updateMany(
      { },
      { $pull: { image: fileId } },
      )
      console.log('This runs when an image image is deleted from aws... it updates the db, by removing ref to the image if it exists' + result)
  })




