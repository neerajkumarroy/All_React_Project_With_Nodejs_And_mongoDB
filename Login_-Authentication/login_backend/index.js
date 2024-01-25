require("./DB/config");
const express = require("express");
const app = express();
const StuSignup = require("./DB/Signupschema");
const LoginSchema = require("./DB/schema");
const cors = require('cors');

//Login API
app.use(cors());
app.use(express.json());

app.post("/login", async (req, resp) => {
    if (req.body.Email_id && req.body.password) {        
      let payload = {
        Email_id: req.body.Email_id,
        password: req.body.password
      };     
  
      let data = await StuSignup.findOne(payload);
      console.log(data);
  
      if (data) {
        resp.send(data);
      } else {
        resp.send({ result: "Please Enter Valid email id and password" });
      }
    } else {
      resp.send({ result: "Please Enter Valid email id and password" });
    }
  });
  

//Signup API
app.post("/signup", async (req, resp) => {
    let payload = req.body;
    const data = new StuSignup(payload);
    let result = await data.save();
    result = result.toObject();
    delete result.password
    resp.send(result);

})

//get API
app.get("/list", async (req, resp) => {
    const data = await StuSignup.find();
    resp.send(data);
})
app.listen(4000, () => {
    console.log("app is running on the port number 4000")
})