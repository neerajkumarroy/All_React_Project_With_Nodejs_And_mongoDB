import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');

    const Navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        Navigate('/signup')
    }

    return (
        <div >
            {/* <img
                alt='logo'
                className='logo' // Remove extra quotes around 'logo'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkLZLakbcGRxoD2LmpXNjAfwhuAqJNVra44dXs3boK5w&s'
            /> */}

            {auth ?
                <ul className="nav-ul">
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Products</Link></li>
                    {/* <li><Link to="/update/:_id">Update Products</Link></li> */}
                    <li><Link to="/profile">profile</Link></li>
                    <li> <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li>  <Link to="/login">Login</Link></li>
                </ul>
            }

        </div>
    )
}

export default Nav;

