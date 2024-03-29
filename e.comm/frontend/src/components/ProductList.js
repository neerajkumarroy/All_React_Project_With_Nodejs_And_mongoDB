import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Productlist = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        getProducts();

    }, [])

    let getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setProducts(result)
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }

        });
        result = await result.json();
        if (result) {
            getProducts();

        }


    }

    const SearchHandel = async (event) => {
        // console.warn(event.target.value)
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        }
        else {
            getProducts();
        }


    }

    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input className="InputBox" type="text" placeholder="Search Products" onChange={SearchHandel} />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button className="updateButton" onClick={() => deleteProduct(item._id)}>Delete</button>


                         <button >   <Link className="updateButton" to={"update/" + item._id}>Update</Link></button>

                        </li>
 
                    </ul>

                )
                    :
                    <h1>No Result Found</h1>
            }

        </div>
    )
}


export default Productlist;
