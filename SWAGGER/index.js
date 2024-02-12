const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.use(express.json())

let users = [
    {id:1,name:"neeraj",age:"21"},
    {id:2,name:"Akshay",age:"25"},
    {id:3,name:"Shubham",age:"30"}
]
app.get("/string",(req,resp) =>{
    resp.status(200).resp.send("This is a String.")
})

app.get("/user",(req,resp) =>{
    const obj = {id:1,name:"neeraj",age:"21"}
    resp.send(obj)
})

app.get("/users",(req,resp) =>{
    resp.status(200).send(users)
})

app.get("/users/:id",(req,resp)=>{
    const obj = users.find((x) => x.id === parseInt(req.params.id))
    resp.status(200).send(obj)
})

app.post("/add",(req,resp) => {
    users = [req.body,...users];
    resp.send(users)
})

app.listen(5000,()=>console.log("API Running"))