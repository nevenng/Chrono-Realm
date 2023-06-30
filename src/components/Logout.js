import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = (props) => {
  const { setUserToken } = props;

  const history = useHistory();

  const handleLogout = async (event) => {
    event.preventDefault();
    setUserToken('');
    localStorage.removeItem('userToken');
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
