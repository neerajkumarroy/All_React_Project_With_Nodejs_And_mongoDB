const mongoose = require("mongoose");
const productschema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
})
    

const Products = mongoose.model('products', productschema);
module.exports = Products;