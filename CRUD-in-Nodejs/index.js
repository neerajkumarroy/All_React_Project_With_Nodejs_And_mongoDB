const express = require("express");
const products = require("./model");
require("./config");
const app =express();
const port = process.env.PORT|5000;

// POST API
app.use(express.json());
app.post("/create",async (req,resp) => {
    let data = new products(req.body);
    let result = await data.save();
    resp.send(data);
    console.log(data);
})

// GET API
app.get("/list",async(req,resp) => {
    let data = await products.find();
    console.log(data);
    resp.send(data);
})

// DELETE API
app.delete("/delete/:_id",async(req,resp) => {
    let data = await  products.deleteOne(req.params)
    resp.send(data);
    console.log(data);
})

// UPDATE API
app.put("/update/:_id",(req,resp) => {
    let data = products.updateOne(
        req.params,
        {
            $set:req.body
        }        
    );
    resp.send(data);
    console.log(data);
})

app.listen(port,() => {
    console.log("app is listenng the port number 5000..!")
})