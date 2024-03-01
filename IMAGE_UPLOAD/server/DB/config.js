require("dotenv").config();
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Connection is Succesfull");
}).catch((err)=>{
    console.log(err);
})