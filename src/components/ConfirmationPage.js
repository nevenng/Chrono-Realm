import React from 'react';
import { useHistory } from 'react-router-dom';
import { MyItems } from '.'

const ConfirmationPage = ({ user, sessionId }) => {
  const history = useHistory();

  if (!user || !sessionId) {
    history.push('/home');
    return null;
  }

  return (
      <div className="confirmation-message-container">
        <p className="confirmed-message">Your order is confirmed.</p>
        <p className="thank-you-message">Thank you for shopping with us!</p>
        <p className="confirmation-email-message">Your confirmation email will be sent shortly.</p>
      </div>
  );
};

export default ConfirmationPage;
