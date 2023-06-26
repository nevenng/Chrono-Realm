import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

/* 
IMPORT REACT COMPONENTS BELOW
*/
import { AccountForm, Navbar, ProductListPage } from '../components'

const App = () => {

  return (
    <>
      <Navbar />
      <Switch>
        <Route
          path='/products'
          render={() => (
            <ProductListPage />
          )}
        />
        <Route
          path='/account/:actionType'
          render={() => (
            <AccountForm />
          )}
        />
      </Switch>
    </>
  );
}

export default App;