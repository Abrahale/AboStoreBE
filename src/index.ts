import express  from "express";
console.log("AboStore-BACKEND ---------#2022/10/09")

const app = express();
app.listen(3000,()=>{
    console.log('The server is listening on PORT 3000')
})

app.get('/',(req,res)=>{
    res.send({
        "status":200,
        "message":"This is just to test this endpoint is working!"
    })
})