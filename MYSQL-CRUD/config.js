const mysql = require("mysql")
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"xyz"
});

con.connect((err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("DataBase connected..!");
    }
})

module.exports = con;
