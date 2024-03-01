const mongoose = require("mongoose");
const passwordSchema = mongoose.Schema({
    email:String
})

const PassSchema = mongoose.model('password',passwordSchema);
module.exports = PassSchema;
