import React from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">Add Logo Here</div>
                <ul className="nav-menu">
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