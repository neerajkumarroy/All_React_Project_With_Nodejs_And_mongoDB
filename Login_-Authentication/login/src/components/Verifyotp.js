import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';


function App() {
    const [verifypass, setVerifypass] = useState("");
    const Navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const handleclose = () => {
        Navigate("/")
    }  

    return (
        <div className="container">
            <h5 className='title'>Please Enter Password Which Password send your eamil Account</h5>
            <div className='fcontainer'>
                <form onSubmit={handleSubmit}>
                    <div className='close-btn' onClick={handleclose}><MdClose /></div>
                    <label htmlFor='verifypass'>Please Enter Password:</label>
                    <input
                        type='text'
                        id="verifypass"
                        name="verifypass"
                        placeholder='****'
                        value={verifypass}
                        onChange={(e) => setVerifypass(e.target.value)}
                    />
                    <button className="btn" type="submit">Update Password</button>
                </form>
            </div>
            <ToastContainer style={{ fontSize: 15 }} />
        </div>
    );
}

export default App;
