const express = require('express');
const sellersRouter = express.Router();

// const { authSeller, authUser } = require('../../auth/basicAuth');
// const { setUser } = require('../../auth/setUser');

const {    
    sellerAuth,
    sellerSignup,
    sellerLogin,
    sellerProfile,
    sellersBooks,
    addNewBook,
    sellersOrders } = require('./sellers.controller');
   
sellersRouter.use(express.json());

sellersRouter.get('/', sellerAuth);
sellersRouter.post('/new', sellerSignup);
sellersRouter.post('/login', sellerLogin);

// sellersRouter.use(setUser);
// sellersRouter.use(authUser);

// sellersRouter.get('/:sellerId', authSeller, sellerProfile);

// sellersRouter.get('/:sellerId/books', authSeller, sellersBooks);
// sellersRouter.get('/:sellerId/books/new', authSeller, addNewBook);

// sellersRouter.get('/:sellerId/orders', authSeller, sellersOrders);



sellersRouter.get('/:sellerId', sellerProfile);

sellersRouter.get('/:sellerId/books', sellersBooks);
sellersRouter.get('/:sellerId/books/new', addNewBook);

sellersRouter.get('/:sellerId/orders', sellersOrders);

module.exports = sellersRouter;