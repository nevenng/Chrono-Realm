import React from "react";
import { Link } from "react-router-dom"
import { Logout } from '../components'

const Navbar = (props) => {

    const { userToken, setUserToken } = props;
    // need to pass in token, or user in order for the conditional 
    // comment in line 21-23 & 27 when token is defined

    // const token = true;
    // ^^^^ to test UI change to true
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
                    {/* Fror now we can have an inline navbar, discuss later if implementing modal */}
                    {userToken ? (
                        <li className="nav-item">
                            <Link to="/orders" className="nav-link">
                                My Orders
                            </Link>
                        </li>
                    ) : (
                        null
                    )}
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">
                            Cart
                        </Link>
                    </li>
                    <li className="nav-item">
                        {userToken ? (
                            <Logout setUserToken={setUserToken} userToken={userToken} />
                        ) : (
                            <Link to="/account/login" className="nav-link">
                                Login
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;