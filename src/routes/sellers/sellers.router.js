const express = require('express');

const {    
    sellerAuth,
    sellerSignup,
    sellerLogin,
    sellerProfile,
    sellersBooks,
    addNewBook,
    sellersOrders } = require('./sellers.controller');
   
const sellersRouter = express.Router();

sellersRouter.get('/', sellerAuth);
sellersRouter.get('/new', sellerSignup);
sellersRouter.get('/login', sellerLogin);

sellersRouter.get('/:sellerId', sellerProfile);

sellersRouter.get('/:sellerId/books', sellersBooks);
sellersRouter.get('/:sellerId/books/new', addNewBook);

sellersRouter.get('/:sellerId/orders', sellersOrders);

module.exports = sellersRouter;