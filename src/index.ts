import express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import {getConnectionInstance} from "./services/database.service"
import { authenticationRouter } from "./routes/authentication";
import { categoryRouter } from "./routes/category";
import { departmentRouter } from "./routes/department";
import { productsRouter } from "./routes/products";
import { usersRouter } from "./routes/users.router";
import { manufacturerRouter } from "./routes/manufacturer";
import { seedDatabaseRouter } from "./database/seed_db";
import { cartRouter } from "./routes/cart";
import { emailerRouter } from './routes/emailer.router';
import { fileUploadRouter } from './routes/file-upload'
import { notFound, errorHandler } from "./middleware/errorHandler.middleware";
import session from 'express-session'
import  cookieParser  from 'cookie-parser'

dotenv.config();
const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
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

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.get('/',(req,res)=>{
        if(!req.session) {
        req.session.regenerate;
    }
    res.setHeader("set-cookie","identifier=456fasdf456adfasd5f46")
    res.cookie("ab","2005")
    res.send({
        "status":200,
        "message":"This is just to test this endpoint is working!",
        "session":req.cookies,
    })
})
app.use("/users", usersRouter);
app.use("/auth", authenticationRouter);
app.use("/departments", departmentRouter);
app.use("/categories", categoryRouter);
app.use("/cart", cartRouter);
app.use("/manufacturer", manufacturerRouter);
app.use("/products", productsRouter);
app.use("/seed-db", seedDatabaseRouter);
app.use("/emailer", emailerRouter);
app.use("/file-uploads", fileUploadRouter)
app.use(notFound)
app.use(errorHandler)
