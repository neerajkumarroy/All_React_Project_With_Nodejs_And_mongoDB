require("./DB/config");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require('cors');
const express = require("express");
const app = express();
const StuSignup = require("./DB/Signupschema");
const PassSchema = require("./DB/passwordschema")
const rendompass = require("./DB/rendompass")
const PORT = process.env.PORT || 4000; // Corrected port number

// Login API
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
  const { email } = req.body;  
  const password = new PassSchema({ email: email }); 
  const savePassword = await password.save();
  console.log(savePassword);

  // Call generateotp function
  const otp = rendompass();

  // Define the email options
  const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "This is Your OTP",
      html: `<p>Your OTP is: ${otp}</p>`
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
});

// Listen on the correct port
app.listen(PORT, () => {
  console.log(`app is running on the port number ${PORT}`)
})
