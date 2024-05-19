import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="nav">
      <Link to="/" className="siteTitle">Soil</Link>
      <ul>
        <li>
          <Link to="/farmingAdvice">Farming Advice</Link>
        </li>
        {isLoggedIn ?(
          <>
            <li className={isDropdownOpen ? 'navbarDropdown active' : 'navbarDropdown'} onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle} >
              <button className="dropdownButton">Shop</button>
                {isDropdownOpen && (
                  <div className="dropdownItems">
                    <Link to="/products">Produce</Link>
                    <Link to="/weeklySpecials">Weekly Specials</Link>
                  </div>  
                )}
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/dietPlan">Diet Plan</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </>
        ):(
          <li>
            <Link to="/login">Log In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
