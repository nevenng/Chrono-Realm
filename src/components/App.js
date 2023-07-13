import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { uid } from 'uid';

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
  ConfirmationPage,
  Home,
  Footer,
  AdminDashboard
} from '../components'

const App = () => {

  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem('userToken')
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser !== "undefined") {
      return JSON.parse(storedUser);
    } else {
      return null;
    }
    // return storedUser ? JSON.parse(storedUser) : null
  });

  useEffect(() => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = uid(10);
      localStorage.setItem('sessionId', sessionId)
    }
  })

  const sessionId = localStorage.getItem('sessionId');

  return (
    <>
      <Navbar userToken={userToken} setUserToken={setUserToken} user={user} setUser={setUser} />
      <Switch>
        <Route
          path='/confirmation'
          render={() => (
            <ConfirmationPage user={user} sessionId={sessionId} />
          )}
        />
        <Route
          path='/home'
          render={() => (
            <Home />
          )}
        />
        <Route
          exact path='/products'
          render={() => (
            <ProductListPage user={user} sessionId={sessionId} />
          )}
        />
        <Route
          exact path='/products/:prodId'
          render={() => (
            <ProductDisplayPage user={user} sessionId={sessionId} />
          )}
        />
        <Route
          path='/orders'
          render={() => (
            <MyOrders user={user} userToken={userToken} />
          )}
        />
        <Route
          path='/cart'
          render={() => (
            <CartSummary user={user} sessionId={sessionId} />
          )}
        />
        <Route
          path='/account/:actionType'
          render={() => (
            <AccountForm setUserToken={setUserToken} setUser={setUser} />
          )}
        />
        <Route
          path='/admin/dashboard'
          render={() => (
            <AdminDashboard user={user} />
          )}
        />
      </Switch>
      <Footer />
    </>
  );
}

export default App;