import React from "react";
import { Link,useNavigate } from 'react-router-dom';

function Nav() {
  const auth = localStorage.getItem('user');
  const Navigate = useNavigate();
  const logout = () =>{
    localStorage.clear();
    Navigate('/')
  }
  
  return (
    <div>
      {
        auth ?
          <ul className="nav-ul">
            <li className="li"><Link to="/profile">Profile</Link></li>
            <li className="li"> <Link onClick={logout} to="/">Logout ({JSON.parse(auth).name}) </Link></li>
              
          </ul>
          :
          <ul className="nav-ul" >
             <li className="li"><Link to="/">Login</Link></li>
            <li className="li"><Link to="/signup">SignUp</Link></li>
          </ul>
      }

    </div>
  )
}
export default Nav;