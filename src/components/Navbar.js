import React from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    MyShop
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/products" className="nav-link">
                            Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">
                            Cart
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/account/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;


{/* <nav id='navbar'>
        <div className='links'>
          <Link to="/account/login">Login</Link>
        </div>
      </nav> */}