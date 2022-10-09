import express  from "express";
import cors from 'cors';
import 'dotenv/config';
console.log("AboStore-BACKEND ---------#2022/10/09")

const app = express();

app.use(cors());
app.listen(process.env.PORT,()=>{
    console.log(`The server is listening on PORT ${process.env.PORT} `)
})

app.get('/',(req,res)=>{
    res.send({
        "status":200,
        "message":"This is just to test this endpoint is working!"
    })
})