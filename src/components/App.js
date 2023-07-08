import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

/* 
IMPORT REACT COMPONENTS BELOW
*/
import {
  AccountForm,
  Navbar,
  ProductListPage,
  MyOrders,
  CartSummary,
  ProductDisplayPage,
  ConfirmationPage
} from '../components'

const App = () => {

  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem('userToken')
  });

  const [user, setUser] = useState(() => {
    const storedUser= localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null
  });
  
  return (
    <>
      <Navbar userToken={userToken} setUserToken={setUserToken} user={user} setUser={setUser} />
      <Switch>
        <Route
          path='/confirmation'
          render={() => (
            <ConfirmationPage />
          )}
        />
        <Route
          exact path='/products'
          render={() => (
            <ProductListPage user={user}/>
          )}
        />
        <Route
          exact path='/products/:prodId'
          render={() => (
            <ProductDisplayPage />
          )}
        />
        <Route
          path='/orders'
          render={() => (
            <MyOrders />
          )}
        />
        <Route
          path='/cart'
          render={() => (
            <CartSummary />
          )}
        />
        <Route
          path='/account/:actionType'
          render={() => (
            <AccountForm setUserToken={setUserToken} setUser={setUser} />
          )}
        />

      </Switch>
    </>
  );
}

export default App;