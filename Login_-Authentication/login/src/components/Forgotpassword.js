import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';


function App() {
    const [emailid, setEmailid] = useState("");
    const Navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailid("")

        if (emailid) {
            toast.success("OTP send Successfully");
        } else {
            toast.error("Please enter a valid Email address");
            return;
        }

        await fetch("http://localhost:8000/password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: emailid })
        })
    };

    const handleFpassword = () => {       
        Navigate("/")

    }

    return (
        <div className="container">
            <h5 className='title'>Send OTP To The Email Account</h5>
            <div className='fcontainer'>
                <form onSubmit={handleSubmit}>
                    <div className='close-btn' onClick={handleFpassword}><MdClose /></div>
                    <label htmlFor='email'>Email address:</label>
                    <input
                        type='text'
                        id="email"
                        name="email"
                        placeholder='Receiver email address'
                        value={emailid}
                        onChange={(e) => setEmailid(e.target.value)}
                    />
                    <button className="btn" type="submit" >Send OTP</button>
                </form>
            </div>
            <ToastContainer style={{fontSize:15}}/>
        </div>
    );
}

export default App;
