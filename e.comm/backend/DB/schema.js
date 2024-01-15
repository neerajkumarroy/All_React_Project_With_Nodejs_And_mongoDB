const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
    

const Users = mongoose.model('users', userschema);
module.exports = Users;