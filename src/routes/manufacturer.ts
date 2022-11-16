import express, { Request, Response } from "express";
import { handleResponse, handleError } from "../middleware/response.middeware";
import { IManufacturer, Manufacturer } from "../models/manufacturer";
export const manufacturerRouter = express.Router();
manufacturerRouter.use(express.json());
// GET
manufacturerRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const manufacturer = await Manufacturer.find({}).exec();
    handleResponse(res,manufacturer)
  } catch (error: any) {
      handleError(res,error)
  }
});

manufacturerRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.query.id;
  try {
      const query = { _id: id };
      const result =  await Manufacturer.findById(query).exec();
      if (result) {
        handleResponse(res,result)
      }
  } catch (error) {
    handleError(res,`Unable to find matching document with id: ${req.query.id}`)
  }
});
// POST
manufacturerRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newCategoryProduct = req.body as IManufacturer;
    const manufacturer = new Manufacturer(newCategoryProduct);
    const result = await manufacturer.save();
     handleResponse(res,`Successfully created a new manufacturer with id ${result._id}`)
} catch (error) {
  handleError(res,`Failed to create a new manufacturer. Error: ${error}`);
}
});