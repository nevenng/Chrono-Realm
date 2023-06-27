import React from "react";
import { Link } from "react-router-dom"
import { Logout } from '../components'

const Navbar = () => {
    // need to pass in token, or user in order for the conditional for 
    // comment in line 21-23 & 27 when token is defined

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">Add Logo Here</div>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/products" className="nav-link">
                            All Products
                        </Link>
                    </li>
                    <li className="nav-item">
                        {/* {token ? (
                            <Logout />
                        ) : ( */} 
                            <Link to="/account/login" className="nav-link">
                                Login
                            </Link>
                        {/* )} */}
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;