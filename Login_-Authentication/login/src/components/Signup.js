import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      Navigate("/profile");
      setEmailError();
    }
  });

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handelSignup = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError(""); // Clear the error message
    }

    console.log(username, email, password);

    let result = await fetch("http://localhost:8000/signup", {
      method: "post",
      body: JSON.stringify({ username, Email_id: email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      Navigate("/profile");
    }
  };

  return (
    <div className="login-div">
      <h2>Signup</h2>

      <div className="login-div">
        <label>User Name:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="login-div">
        <label>Email-id:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p style={{ color: "red", paddingTop:"-8px", fontSize:"10px" }}>{emailError}</p>}
      </div>

      <div className="login-div">
        <label>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" onClick={handelSignup}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
