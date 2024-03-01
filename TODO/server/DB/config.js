const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("Connection to MongoDB successful");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
