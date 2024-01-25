import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

    //   useEffect(()=>{
    //     const auth = localStorage.getItem("user")
    //     if(auth)
    //     {
    //         Navigate("/profile")
    //     }
    // })

  const handelSignup = async () => {
    console.log(username, email, password);
    let result = await fetch('http://localhost:4000/signup', {
      method: 'post',
      body: JSON.stringify({ username, Email_id: email, password }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    result = await result.json();
    console.warn(result)
    localStorage.setItem("user",JSON.stringify(result));
    if(result)
    {
        Navigate('/profile')
    }

    
}

  return (
    <div className="login-div" >
      <h2>Signup</h2>

      <div className="login-div" >
        <label>User Name:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="login-div">
        <label>Email-id:</label>
        <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div >

      <div className="login-div">
        <label>Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button type="submit" onClick={handelSignup} >Sign Up</button>
      

    </div>                                                                    
  );
};

export default Signup;
