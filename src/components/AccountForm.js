import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom"

const AccountForm = () => {
    const params = useParams();
    const { actionType } = params;

    // Need to create a handleSumbit function
    // Need a login + register endpoint
    // Need to redirect users to page with all products

    return (

        <form className="account-form">
            <h1>{actionType === "login" ? "Login" : "Register Your Account"}</h1>
            <br></br>
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" name="email" className="form-input" required></input>
            <label htmlFor="password" className="form-label" >Password</label>
            <input type="password" name="password" className="form-input" required></input>
            <button type="submit" className="form-button">Submit</button>
            <div>
                {actionType === 'login'
                    ? <Link to="/account/register" className="form-link">Need an account? Register here.</Link>
                    : <Link to="/account/login" className="form-link">Already have an account? Log in here</Link>
                }
            </div>
        </form>
    )
}

export default AccountForm;