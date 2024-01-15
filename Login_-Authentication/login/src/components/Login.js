
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  useEffect(() =>{

    const auth = localStorage.getItem('user');
    if(auth)
    {
      Navigate('/pfrofile')
    }
  })


  const handelLogin = async () => {
    console.log(email, password);
    let result = await fetch('http://localhost:4000/data', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json'
      }
    });

    result = await result.json();
        console.warn(result);
        if(result.email)
        {
            localStorage.setItem("user",JSON.stringify(result))
            Navigate('/profile')
        }else{
            alert("please Enter Correct Details")
        }
    }
  return (
    <div className="login-div" >
      <h2>Login</h2>

      <div className="login-div">
        <label>UserEmail:</label>
        <input type="text" id="password" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="login-div">
        <label>Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button type="submit" onClick={handelLogin} >Login</button>

    </div>
  );
};

export default Login;
