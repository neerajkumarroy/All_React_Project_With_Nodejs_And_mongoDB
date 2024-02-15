const mysql = require("mysql")
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"demo"
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