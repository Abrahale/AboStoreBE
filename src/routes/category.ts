import express, { Request, Response } from "express";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { ICategory, Category } from "../models/category";
import  asyncHandler  from 'express-async-handler';
import { isValidObjectId } from "../utils/validateObjectId.utils";

export const categoryRouter = express.Router();
categoryRouter.use(express.json());
const ash = asyncHandler
// GET
categoryRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const category = await Category.find({}).exec();
    handleResponse(res,category)
  } catch (error: any) {
      handleError(res,error)
  }
});

categoryRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
      const query = { _id: id };
      const result =  await Category.findById(query).exec();
      if (result) {
        handleResponse(res,result)
      }
  } catch (error) {
    handleError(res,`Unable to find matching document with id: ${req.query.id}`)
  }
});
// POST
categoryRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newCategoryProduct = req.body as ICategory;
    const category = new Category(newCategoryProduct);
    const result = await category.save();
    if(result){
      const cats = await Category.find({}).exec()
      if(cats)
      handleResponse(res,cats,`Successfully created a category`)

    }
    else
      handleError(res,res.errored,"Failed to create category, Please try again")
} catch (error) {
  handleError(res,`Failed to create a new category. Error: ${error}`);
}
});

categoryRouter.post("/cat-by-department", ash(async (req:Request, res:Response)=>{
    let query = req.body.department
    console.log(query)
    try{
      const result = await Category.find({
        department:{
          $in:query
        }
      })
      handleResponse(res,result)
    }
    catch(error){
      handleError(res,error)
    }
}))

categoryRouter.get("/delete/:",ash( async (req: Request, res: Response) => {
  const id = req.query.id;
  isValidObjectId(id)
      const result =  await Category.findByIdAndDelete({_id:id});
      if (result) {
        try {
          const categories = await Category.find({}).exec();
          handleResponse(res,categories,"Category deleted successfully")
        } catch (error: any) {
            handleError(res,error,"Category deleted successfully, but there was an error getting list of departments")
        }
      }
      else{
        throw new  Error(`Category Not Found with id: ${id}`);
      }
  }
));