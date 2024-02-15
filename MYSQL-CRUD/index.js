const express = require("express");
const app = express();
const PORT = 7000;
const con = require("./config");

app.use(express.json());

//This GET API
app.get("/list", (req, resp) => {
    con.query("select * from user", (err, result) => {
        if (err) {
            resp.send(err)
        } else {
            resp.send(result)
        }
    })
})

//This is the POST API

app.post("/post", (req, resp) => {
    const data = req.body;
    con.query("INsert INTO user SET ?", data, (err, result, fields) => {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send(result)
        }
    })
})

//This is the PUT API

app.put("/update/:id", (req, resp) => {
    console.log(req.body);
    resp.send(req.body)
    const data = [req.body.fname, req.body.lname, req.body.username, req.body.roll, req.params.id];
    con.query("UPDATE user SET fname = ?, lname = ?, username = ?, roll = ? WHERE id = ?", data, (err, result, fields) => {
        if (err) {
            resp.send(err);
        } else {
            resp.send(result);
        }
    });
});

//This is the Delete API
app.delete("/delete/:id", (req, resp) => {
    con.query("DELETE FROM user WHERE id = ?", req.params.id, (err, result) => {
        if (err) throw err
        resp.send(result)
    })
})

app.listen(PORT, () => {
    console.log(`App is Running on the Port Number ${PORT}`);
})

