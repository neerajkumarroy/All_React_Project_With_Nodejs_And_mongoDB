import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Forgotpassword() {
    const [forgotPassword, setForgotPassword] = useState(true);
    const Navigate = useNavigate();

    const handelSumit = async (e) => {
        e.preventDefault()
    }

    const handleFpassword = () => {
        setForgotPassword(false)
        Navigate("/")

    }
    return (
        <>
            <div className="container">

                {
                    forgotPassword && (
                        <div className='fcontainer'>
                            <form>
                                <div className='close-btn' onClick={handleFpassword}><MdClose /></div>
                                <label htmlFor='email'>Email-id</label>
                                <input type='txt' id="name" name="name"></input>

                                <label htmlFor='OTP'>Please Enter OTP</label>
                                <input type='OTP' id="OTP" name="OTP"></input>

                                <button onClick={handelSumit}>Send OTP</button>
                            </form>
                        </div>
                    )
                }



            </div>
        </>
    );
}

export default Forgotpassword;