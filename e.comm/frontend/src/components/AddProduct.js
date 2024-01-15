import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false)
    const Navigate=useNavigate();


    const AddProduct = async () => {


        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product', {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });

        result = await result.json();
        console.warn(result)
        localStorage.setItem("user",JSON.stringify(result))
        Navigate('/')


    }
    return (
        <div className="product">
            <h1>Add Products</h1>
            <input type="text" placeholder="Enter Product Name" className="inputbox"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            {error && !name  &&<span className="invalid-input"> Enter Valide Name</span>}


            <input type="text" placeholder="Enter Product Price" className="inputbox"
                value={price} onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="invalid-input"> Enter Valide price</span>}


            <input type="text" placeholder="Enter Product Category" className="inputbox"
                value={category} onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category &&<span className="invalid-input"> Enter Valide category</span>}

            <input type="text" placeholder="Enter Company Name" className="inputbox"
                value={company} onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company &&<span className="invalid-input"> Enter Valide company</span>}

            <button onClick={AddProduct} className="AppButton"> Add Product</button>
        </div>
    )
}


export default UpdateProduct;