
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const [Email_id, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  useEffect(() =>{

    const auth = localStorage.getItem('user');
    if(auth)
    {
      Navigate('/profile')
    }
  })


  const handelLogin = async () => {    
    let result = await fetch('http://localhost:4000/login', {
      method: 'post',
      body: JSON.stringify({ Email_id, password }),
      headers: {
        'Content-type': 'application/json'
      }
    });

    result = await result.json();
        console.warn(result);
        if(result.Email_id)
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
        <input type="text" id="password" value={Email_id} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="login-div">
        <label>Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
    <Link  className= "forgotpassword" to="/forgot">Forgot Password</Link>
       {/* <a className="forgot" href="#">Forgot Password</a> */}
      <button type="submit" onClick={handelLogin} >Login</button>

    </div>
  );
};

export default Login;
