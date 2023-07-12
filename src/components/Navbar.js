import React from "react";
import { Link } from "react-router-dom"
import { Logout, AdminDashboard } from '../components'

const Navbar = (props) => {

    const { userToken, setUserToken, user, setUser } = props;
   
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/home" className="nav-link">
                    <div className="navbar-logo">Chrono Realm</div>
                </Link>

                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/products" className="nav-link">
                            All Products
                        </Link>
                    </li>
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
                            <Logout setUserToken={setUserToken} userToken={userToken} setUser={setUser} user={user} />
                        ) : (
                            <Link to="/account/login" className="nav-link">
                                Login
                            </Link>
                        )}
                    </li>
                    {user?.role === "admin" && (
                        <li className="nav-item">
                            <Link to="/admin/dashboard" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;