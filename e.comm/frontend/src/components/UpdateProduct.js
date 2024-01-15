import React, { useEffect, useState } from "react";
import {useParams,useNavigate} from 'react-router-dom'
 
const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const { _id } = useParams();
    const params = "";
    const Navigate = useNavigate();

    useEffect(()=>{
        // console.warn(params)
        getProductDetails();
    },[])

    console.log("params", _id);

//Prefill Data
    const getProductDetails=async()=>{
        // console.warn(params)

        let result = await fetch(`http://localhost:5000/product/${_id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        setName(result.name)
        setPrice(result.price)  
        setCategory(result.category)
        setCompany(result.company)
    }

    

    const UpdateProduct = async () => {
        console.warn(name,price,category,company)

        let result = await fetch(`http://localhost:5000/product/${_id}`,{
            method:'put',
            body:JSON.stringify({name,price,category,company}),
           headers:{
            'Content-type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
           }
        });

        result = await result.json();
        console.warn(result)
        Navigate("/")
        
    }
    return (
        <div className="product">
            <h1>Update  Products</h1>
            <input type="text" placeholder="Enter Product Name" className="inputbox"
                value={name} onChange={(e) => setName(e.target.value)}
            />
           

            <input type="text" placeholder="Enter Product Price" className="inputbox"
                value={price} onChange={(e) => setPrice(e.target.value)}
            />
            

            <input type="text" placeholder="Enter Product Category" className="inputbox"
                value={category} onChange={(e) => setCategory(e.target.value)}
            />
           

            <input type="text" placeholder="Enter Company Name" className="inputbox"
                value={company} onChange={(e) => setCompany(e.target.value)}
            />
           

            <button onClick={UpdateProduct} className="AppButton">Update</button>
        </div>
    )
}


export default UpdateProduct;