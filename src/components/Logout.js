import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = (props) => {
  const { setUserToken, setUser } = props;

  const history = useHistory();

  const handleLogout = async (event) => {
    event.preventDefault();
    setUserToken('');
    localStorage.removeItem('userToken');
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('sessionId')
    history.push('/account/login');
  };

  return (
    <div className="navbar-container">
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Logout;
