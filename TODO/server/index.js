require("./DB/config");
const express = require("express");
const Schema = require("./DB/schema")
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
//Get data
app.get("/", async (req, resp) => {
    const data = await Schema.find({})
    resp.json({ success: true, data: data });
})

//create data and save data inti the MongoDB Database
app.post("/add", async (req, resp) => {
    const payload = req.body;
    console.log(payload);
    let data = new Schema(payload);
     data = await data.save();
    resp.send({ success: true, message: "Data save succesfully.... ", data: data})
})

//Update data 
app.put("/update", async (req, resp) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    console.log(rest);
    const data = await Schema.updateOne({ _id: _id }, rest)
    resp.send({ success: true, message: "Data update succesfull... ", data: data })
})

//delete data from the mongoDB 
app.delete("/delete/:id", async (req, resp) => {
    const id = req.params.id;
    const data = await Schema.deleteOne({ _id: id });
    resp.send({ success: true, message: "data is deleted succesfully..", data: data })
})

app.listen(PORT, () => {
    console.log("app is running on the port number 5000");
})