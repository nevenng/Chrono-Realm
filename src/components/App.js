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
  ProductDisplayPage
} from '../components'

const App = () => {

  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem('userToken')
  });

  return (
    <>
      <Navbar userToken={userToken} setUserToken={setUserToken} />
      <Switch>
        <Route
          exact path='/products'
          render={() => (
            <ProductListPage />
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
            <AccountForm setUserToken={setUserToken} />
          )}
        />
      </Switch>
    </>
  );
}

export default App;