const mongoose = require("mongoose");
const ToDoSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String
},{
    timestamps : true
})

const Schema = mongoose.model("userss",ToDoSchema);
module.exports = Schema;
