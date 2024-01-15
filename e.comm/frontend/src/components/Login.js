import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';

const Login =()=>{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const Navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user")
        if(auth)
        {
            Navigate("/")
        }
    })
    const handelLogin = async()=>
    {
        console.log(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-type':'application/json'
            }
        });

        result = await result.json();
        console.warn(result);
        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            Navigate('/')
        }else{
            alert("please Enter Correct Details")
        }
    }
    return(
        <div className="login">
            <input type="text" className="inputbox" placeholder="Enter Email" 
            onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            <input type="password" className="inputbox" placeholder="Enter Password" 
            onChange={(e)=>setPassword(e.target.value)} value={password}></input>
            <button  onClick={handelLogin} className="AppButton">Login</button>

            
        </div>
    )
}

export default Login;