import express, { Request, Response } from "express";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { Department, IDepartment } from "../models/department";
import  asyncHandler  from 'express-async-handler';
import { isValidObjectId } from "../utils/validateObjectId.utils";
export const departmentRouter = express.Router();

const ash = asyncHandler
departmentRouter.use(express.json());
// GET
departmentRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const department = await Department.find({}).exec();
    handleResponse(res,department)
  } catch (error: any) {
      handleError(res,error)
  }
});

departmentRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
      const query = { _id: id };
      const result =  await Department.findById(query).exec();
      if (result) {
        handleResponse(res,result)
      }
  } catch (error) {
    handleError(res,`Unable to find matching document with id: ${req.query.id}`)
  }
});
// POST
departmentRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newDepartment = req.body as IDepartment;
    const department = new Department(newDepartment);
    const result = await department.save();
     handleResponse(res,`Successfully created a new department with id ${result._id}`)
} catch (error) {
  handleError(res,`Failed to create a new department. Error: ${error}`);
}
});

departmentRouter.get("/delete/:",ash( async (req: Request, res: Response) => {
  const id = req.query.id;
  isValidObjectId(id)
      const result =  await Department.findByIdAndDelete({_id:id});
      if (result != null) {
        try {
          const departments = await Department.find({}).exec();
          let responseObject = {message:"Department deleted successfully",departments:[...departments]}
          handleResponse(res,responseObject)
        } catch (error: any) {
            handleError(res,{message:"Department deleted successfully, but there was an error getting list of departments",error:{...error}})
        }
      }
      else{
        throw new  Error(`Departments Not Found with id: ${id}`);
      }
  }
));