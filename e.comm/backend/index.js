require("./DB/config")
require('dotenv').config();
 
const express = require("express");
const app = express();
const cors = require("cors")
const Employee = require("./DB/schema");
const Products = require("./DB/products");
const Jwt = require("jsonwebtoken");
const SecretKey = process.env.KEY;
const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use(cors());

//Register API

app.post('/register', async (req, resp) => {
    try {
        const data = new Employee(req.body);
        let result = await data.save();
        result = result.toObject();
        //toObject() function would be determined by how it is implemented in that particular context.
        delete result.password
        Jwt.sign({ result }, SecretKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                resp.send({ result: "Somthing Went Wrong. Please try After some time....!" })
            } else {

                resp.send({ result, auth: token })
            }
        })

    } catch (error) {
        resp.status(500).json({ message: error.message });
    }
});

// Login API
app.post("/login", async (req, resp) => {

    if (req.body.password && req.body.email) {
        let user = await Employee.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, SecretKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    resp.send({ result: "Somthing Went Wrong. Please try After some time....!" })
                } else {

                    resp.send({ user, auth: token })
                }
            })
        } else {
            resp.send({ result: 'User Not Found.....!' })
        }
    } else {
        resp.send({ result: 'User Not Found....!' })
    }
})

// Add Products

app.post('/add-product', veryfyToken, async (req, res) => {
    try {
        const product = new Products(req.body);
        let result = await product.save();
        res.send(result)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Product List API

app.get("/products", veryfyToken, async (req, resp) => {
    const product = await Products.find();
    if (product.length > 0) {
        resp.send(product)
    }
    else {
        resp.send({ result: "Products Not Found.....!" })
    }
})

//Delete API

app.delete("/product/:id", veryfyToken, async (req, resp) => {
    // console.log(req.params.id)
    const result = await Products.deleteOne({ _id: req.params.id })
    // console.log(result)
    resp.send(result);
})

//prefill Data
app.get("/product/:id", async (req, resp) => {
    let result = await Products.findOne({ _id: req.params.id })

    if (result) {
        resp.send(result)
    }
    else {
        resp.send({ result: "Result is Not Found" })
    }
})

// Update API

app.put("/product/:id", veryfyToken, async (req, resp) => {
    let result = await Products.updateOne(

        { _id: req.params.id },

        {
            $set: req.body
        }
    )
    resp.send(result);
})

//Search Api

app.get("/search/:key", veryfyToken, async (req, resp) => {
    let key = req.params.key;
    let data = await Products.find(
        {
            "$or": [
                {
                    "name": { $regex: key }
                },
                {
                    "company": { $regex: key }
                },
                {
                    "category": { $regex: key }
                }
            ]
        }
    )
    resp.send(data);
})
function veryfyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];//i am geating token in this line(only token get not Bearer)
        Jwt.verify(token, SecretKey, (err, valid) => {
            if (err) {

                resp.status(401).send({ result: "The token is not valid. Please insert the valid token in the headers" })
            } else {
                next();
            }
        })
    }
    else {
        resp.status(403).send({ result: "Please provise valide token" })
    }
    // console.warn("Verfy tokrn id called:", token[1]);
}
app.listen(PORT, () => {
    console.log(`app is running the port number ${PORT}`)
})
