import React from 'react';
import { useHistory } from 'react-router-dom';
import { MyItems } from '.'

const ConfirmationPage = () => {
  // { userToken, orderId }
  const history = useHistory();

  const userToken = true;
  const orderId = "0RD001"

  if (!userToken || !orderId) {
    history.push('/products');
    return null;
  }

  return (
    <div>
      <div className="confirmation-message-container">
        <p className="confirmed-message">Your order is confirmed.</p>
        <p className="thank-you-message">Thank you for shopping with us!</p>
        <p className="confirmation-email-message">Your confirmation email will be sent shortly.</p>
      </div>
      <div className="confirmed-order-details-container">
        <h2>Order Details:</h2>
        <MyItems />
      </div>
    </div>
  );
};

export default ConfirmationPage;
