require("./config");
const Admin = require("./schema");
const express = require("express");
const app = express();
const StuSignup = require("./Signupschema");
const cors = require('cors');

//Login API
app.use(cors());
app.use(express.json());
app.post("/data", async (req, resp) => {
    if (req.body.username && req.body.password) {
        // console.log(req.body.email)
        let payload = req.body;
        let data = await StuSignup.findOne(payload).select("-password");
        if (data) {
            resp.send(data);
        } else {
            resp.send({ result: "Please Enter Valide emailid and passsword" })
        }
    } else {
        resp.send({ result: "Please Enter Valide emailid and passsword" })
    }

})

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