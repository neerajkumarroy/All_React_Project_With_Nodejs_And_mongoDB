const mongoose= require("mongoose");
const productSchema = new mongoose.Schema({
    name:String,
    passowd:String,
    email:String,
    phone:Number
})

module.exports = mongoose.model("users",productSchema);