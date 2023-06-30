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
  ProductDisplayPage,
  CartSummary
} from '../components'

const App = () => {

  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem('userToken')
  });

  return (
    <>
      <Navbar userToken={userToken} setUserToken={setUserToken}/>
      <Switch>
        <Route
          path='/products'
          render={() => (
            <ProductListPage />
          )}
        />
        <Route
          path='/products/:productId'
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
            <AccountForm setUserToken={setUserToken}/>
          )}
        />
      </Switch>
    </>
  );
}

export default App;