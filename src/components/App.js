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
} from '../components'

const App = () => {

  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem('userToken')
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null
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
        path = '/home'
        render = {() => (
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
            <ProductDisplayPage user={user} sessionId={sessionId}/>
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
            <CartSummary user={user} sessionId={sessionId}/>
          )}
        />
        <Route
          path='/account/:actionType'
          render={() => (
            <AccountForm setUserToken={setUserToken} setUser={setUser} />
          )}
        />
      </Switch>
      <Footer />
    </>
  );
}

export default App;