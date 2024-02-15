const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT||6000;
const products_routs = require("./routes/products")

app.get("/",(req,resp) =>{
    resp.json({message:"this is the get api in this api i am geating all products list...!"})
});

//Medillware or to set routs 

app.use("/api/products",products_routs)

app.listen(PORT,()=>{
    console.log(`App is running on the port ${PORT}`);
})