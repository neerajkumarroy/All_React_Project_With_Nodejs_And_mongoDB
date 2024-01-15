import React from "react";
import { MdClose } from "react-icons/md";
import '../App.css';

const Updatedata = ({ handleSumit, handleonchange, handelclos, rest }) => {
    return (
        <div className="addcontainer">
            <form>
                <div className="close-btn" onClick={handelclos}><MdClose /></div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" onChange={handleonchange} value={rest?.name}></input>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={handleonchange} value={rest?.email}></input>

                <label htmlFor="mobile">Number:</label>
                <input type="text" id="mobile" name="mobile" onChange={handleonchange} value={rest?.mobile}></input>

                <button className="btn" onClick={handleSumit}>Submit</button>
            </form>
        </div>
    )
}

export default Updatedata;
