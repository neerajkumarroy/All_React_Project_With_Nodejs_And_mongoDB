import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [forgotPassword, setForgotPassword] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();  

        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        if(email || subject || message)
        {
            toast.success("Email send Successfully")
        }else
        {
            toast.error("please enter valide Email-id")
        }
   

        fetch("http://localhost:7000/sendemail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, subject, message })
        })
        .then(response => {
            if (response.ok) {
                console.log("Email sent successfully");
            } else {
                console.error("Failed to send email");
            }
        })
        .catch(error => {
            console.error("Error sending email:", error);
        });
    };
 
    return (
        <div className="container">
            {forgotPassword && (
                <div className='fcontainer'>
                    <form>
                        <div className='close-btn'><MdClose /></div>
                        <label htmlFor='email'>Email address:</label>
                        <input type='text' id="email" name="email" placeholder='Receiver email address' />

                        <label htmlFor='subject'>Subject:</label>
                        <input type='text' id="subject" name="subject" placeholder='Enter the Subject here..' />

                        <label htmlFor='message'>Message</label>
                        <textarea id="message" name="message" rows="4" cols="50" placeholder="Enter the message here.."></textarea>
                    
                        <button className="btn" type="submit" onClick={handleSubmit}>Send Email</button>
                    </form>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default App;
