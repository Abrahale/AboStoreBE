import express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {getConnectionInstance} from "./services/database.service"
console.log("AboStore-BACKEND ---------#2022/10/09")
import { authenticationRouter } from "./routes/authentication";
import { categoryRouter } from "./routes/category";
import { departmentRouter } from "./routes/department";
import { productsRouter } from "./routes/products";
import { usersRouter } from "./routes/users.router";
import { manufacturerRouter } from "./routes/manufacturer";
import { seedDatabaseRouter } from "./database/seed_db";
import { cartRouter } from "./routes/cart";
import { notFound, errorHandler } from "./middleware/errorHandler.middleware";
dotenv.config();
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
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

getConnectionInstance();
app.listen(process.env.PORT,()=>{
    console.log(`The server is listening on PORT ${process.env.PORT} `)  
})
app.get('/',(req,res)=>{
    res.send({
        "status":200,
        "message":"This is just to test this endpoint is working!"
    })
})
app.use("/users", usersRouter);
app.use("/auth", authenticationRouter);
app.use("/departments", departmentRouter);
app.use("/categories", categoryRouter);
app.use("/cart", cartRouter);
app.use("/manufacturer", manufacturerRouter);
app.use("/products", productsRouter);
app.use("/seed-db", seedDatabaseRouter)

app.use(notFound)
app.use(errorHandler)