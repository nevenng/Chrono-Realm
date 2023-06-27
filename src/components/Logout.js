import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Logout = () => {
// pass in { setToken, setUser, token }

    // const history = useHistory();

    // if (token) {
    //     const handleLogout = async (event) => {
    //         event.preventDefault();
    //         try {
    //             setToken(null);
    //             setUser(null)
    //             history.push('/')
    //         } catch (err) {
    //             console.error(err)
    //         }
    //     }
        return (
            <>
                <div className="navbar-container">
                <button className="logout-button" onClick={handleLogout}>Log Out</button>
                </div>
                
            </>
        );
    }
// } <--- uncomment this line out when token is defined 

export default Logout;