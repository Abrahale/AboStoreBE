import express, { Request, Response } from "express";
import { handleResponse } from "../middleware/response.middeware";
import { Category } from "../models/category";
import { Department } from "../models/department";
import { Product, IProduct } from "../models/product";
import deparment from './json-files/department.json';
import category from './json-files/category.json';
//import target_com_data_2022_06_2 from './json-files/target_com_data_2022_06_2.json'
import inital_products from './json-files/initial_products.json'
import { mapDataToArray } from "./some-cool-functions";
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

seedDatabaseRouter.get("/products",async (_req: Request, res: Response) => {
    const result  = await seedProducts()
    res.send(result)
    //handleResponse(res,result)
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

const seedProducts = async () =>{
  try{
    //removePrefixFromImages();
    //updateImages();

  //  const ip = inital_products;
  //  let p = ip.map(el => {return {
  //   productCode:el.productCode,
  //   title:el.title,
  //   quantity:el.quantity,
  //   image:el.image,
  //   description:el.description,
  //   price:el.price,
  //   category:el.category,
  //   manufacturer:el.manufacturer,
  //   available:el.available,
  //   rating:el.rating ?? Math.random()*5,
  //   department:el.department
  //  }})
 // await Product.insertMany(p);
 // const result = await Product.insertMany(getProducts());
  const result = removePrefixFromImages();
  //const result =getProducts();
  return result
 //return getProducts()
  }
  catch(er){
    return "Failed to add Products " + er
  }

}

const updateImages = async() =>{
  const prefix = "https://abostorebucket.s3.af-south-1.amazonaws.com/"; // The prefix you want to add

  const products = await Product.find({}); // Retrieve all products
  
  for (const product of products) {
    const updatedImages = product.image.map(image => {
      let imgStr = prefix + image.trimStart()
      console.log(imgStr.trimStart())
    });
    
    await Product.updateOne(
      { _id: product._id },
      { $set: { image: updatedImages } }
    );
  }
}

const  removePrefixFromImages=async() => {
  const prefixToRemove = "prefix_";

  const products = await Product.find({});
  
  for (const product of products) {
      const updatedImages = product.image.map(image => image.replace(prefixToRemove, ''));
      
      await Product.updateOne(
          { _id: product._id },
          { $set: { image: updatedImages } }
      );
  }
}

//Please don't try can involking any methods in this file, It's garuntted to break the db, unless you sure you know what You are doing.
 const stripWhiteSpaceFromArrays = async() => {
  try {
          const products = await Product.find();
      
          products.map(async product => {
          const strippedImages = product.image.map(image => {
            const trimmedImage = image.trim();
            return trimmedImage;
          });
          try{
            let result = await Product.findOneAndUpdate(
                  { _id: product._id },
                  { image: strippedImages } 
            )
          return result
          }
          catch(err){
            console.log(`There was an error, and I dont know what the issue is${err}`)
          }

      });

      console.log(`documents updated`);
      
  } 
  catch (error) {
      console.error('Error stripping white spaces:', error);
  }
}

function getProducts() {
  let rOb:IProduct;
  const mapOb = {
    title:"title",
    sku:"sku",
    description:"description",
    gtin13:"productCode",
    price:"price",
    images:"image",
    main_image:"mainImage",
    specifications:"specifications"
  }
 // let dd = target_com_data_2022_06_2;
  let dd = []
  let pros = mapDataToArray(dd,mapOb)
  return pros
}


