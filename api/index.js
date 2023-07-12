const apiRouter = require('express').Router();
const jwt = require("jsonwebtoken");
const express = require('express');
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db");



apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  
    if (!auth) {
      next()
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);

      try {
        const parsedToken = jwt.verify(token, JWT_SECRET);
          console.log(parsedToken);
          const id = parsedToken && parsedToken.id;
        if (id) {
          req.user = await getUserById(id);
          next();
        } 
      }
      catch (error) {
        next(error);
      }
    }
    else {
      next({
          name: 'AuthorizationHeaderError',
          message: `Authorization token must start with ${prefix}`
        })
    }
  }
  
)



// place your routers here

// ROUTER: /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);


// ROUTER: /api/products
const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

// ROUTER: /api/carts
const cartRouter = require('./cart');
apiRouter.use('/carts', cartRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);


module.exports = apiRouter;
