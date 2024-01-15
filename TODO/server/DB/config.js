const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://demo1:demo1@cluster0.zh42dct.mongodb.net/todo")
.then(()=>{
    console.log("connection is succesfull");
}).catch((err) => {
    console.log(err)
})