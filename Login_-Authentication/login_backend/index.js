require("./DB/config");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require('cors');
const express = require("express");
const app = express();
const StuSignup = require("./models/Signupschema");
const PassSchema = require("./models/passwordschema")
const rendompass = require("./models/rendompass")
const PORT = process.env.PORT || 4000; //Change the PORT Number

// Login API
app.use(cors());
app.use(express.json());

// Call generateotp function
let password = rendompass();

//Login API
app.post("/login", async (req, resp) => {
  if (req.body.Email_id && req.body.password) {
    let payload = {
      Email_id: req.body.Email_id,
      password: req.body.password
    };
    let data = await StuSignup.findOne(payload); 
    if (data) {
      resp.send(data);
    } else {
      resp.send({ result: "Please Enter Valid email id and password" });
    }
  } else {
    resp.send({ result: "Please Enter Valid email id and password" });
  }
});

// Signup API
app.post("/signup", async (req, resp) => {
  let payload = req.body;
  const data = new StuSignup(payload);
  let result = await data.save();
  result = result.toObject();
  delete result.password
  resp.send(result);
})

// Send password API
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS
  }
});

app.post("/password", async (req, res) => {
  await StuSignup.findOne({ Email_id: req.body.email }).then(async (response) => {
    if (response !== null) {
      const { email } = req.body;
      const password = new PassSchema({ email: email });
      const savePassword = await password.save();
      res.send(savePassword)

      // Define the email options
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "This is Your OTP",
        html: `<p>Your OTP is: ${password}</p>`
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({ success: false, message: "Failed to send OTP" });
        } else {
          console.log("Email sent:", info.response);
          res.status(200).json({ success: true, message: "OTP sent successfully" });
        }
        
      });
    }
    else{
      res.status(400).send({success:true, message:"Please Enter the registerd email id"})
    }
  }).catch(error => {
    console.log(error)
  })


});

// This is the update API
app.put("/update", async (req, resp) => {
  StuSignup.findOne({ Email_id: req.body.email }).then(async (response) => {
    if (response) {
      let updatedUser = {
        username: response.username,
        Email_id: response.Email_id,
        password: password
      };

      await StuSignup.updateOne({ Email_id: req.body.email }, updatedUser);
      resp.send(updatedUser);
    } else {
      resp.send({ success: false, message: "Please Enter valide Email-I" });
    }
  }).catch((error) => {
    resp.status(400).send(error);
  });
});


// Listen on the correct port
app.listen(PORT, () => {
  console.log(`app is running on the port number ${PORT}`)
})
