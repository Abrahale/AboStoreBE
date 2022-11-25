import express, { Request, Response } from "express";
import { handleResponse } from "../middleware/response.middeware";
import { Category } from "../models/category";
import { Department } from "../models/department";
import deparment from './json-files/department.json';
import category from './json-files/category.json';
// Global Config
export const seedDatabaseRouter = express.Router();
seedDatabaseRouter.use(express.json());
// GET
seedDatabaseRouter.get("/department",async (_req: Request, res: Response) => {
    const result  = await seedDepartment()
    handleResponse(res,result)
});

seedDatabaseRouter.get("/category",async (_req: Request, res: Response) => {
    const result  = await seedCategory()
    handleResponse(res,result)
});

const seedDepartment = async () =>{
  try{
    await Department.insertMany(deparment);
    return "Departments added"
  }
  catch{
    return "Failed to add Department "
  }

}

const seedCategory = async () =>{
  try{
    await Category.insertMany(category);
    return "Categories added"
  }
  catch{
    return "Failed to add Categories "
  }

}
