const mongoose = require("mongoose");
const Signupschema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    Email_id: {
        type: String,
        require: true,
        unique: [true, "This Email is already present..!"],

    },
    password: {
        type: String,
        require: true,

    }
})
const Signup = mongoose.model('studentsignups', Signupschema);
module.exports = Signup;