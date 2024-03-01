const express = require("express")
const products = require("./model");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
require("./config");
const app =express();
const port = process.env.PORT;
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

// POST API
app.use(express.json());
app.post("/create",async (req,resp) => {
    let data = new products(req.body);
    let result = await data.save();
    resp.send(result);
    console.log(result);
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
app.put("/update/:_id", async (req, resp) => {
    try {
        const data = await products.updateOne(
            { _id: req.params._id }, // corrected to use req.params._id for the ID
            { $set: req.body }
        );
        console.log("All Good");
        resp.send(data);
        console.log(data);
    } catch (error) {
        console.error(error);
        resp.status(500).send("Internal Server Error");
    }
});

app.listen(port,() => {
    console.log("app is listenng the port number 5000..!")
})