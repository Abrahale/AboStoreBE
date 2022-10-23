import express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import {DbConnection, getConnectionInstance} from "./services/database.service"
console.log("AboStore-BACKEND ---------#2022/10/09")
import * as productRoute from "./routes/product.route";
dotenv.config();
const app = express();
app.use(express.json())
const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      origin: ""
};
app.use(cors());

const db = getConnectionInstance();
app.listen(process.env.PORT,()=>{
    console.log(`The server is listening on PORT ${process.env.PORT} `)  
    //console.log(db) 
})
app.get('/',(req,res)=>{
    res.send({
        "status":200,
        "message":"This is just to test this endpoint is working!"
    })
})
app.get("/products", productRoute.getProductList);
app.post("/products",productRoute.createProduct);
app.post("/update-product",productRoute.updateProduct);
app.post("/delete-product",productRoute.deleteProduct);