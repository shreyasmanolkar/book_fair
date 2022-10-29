const express = require('express');
const viewSellersRouter = express.Router();
const {     allSellers,
    viewSellerProfile,
    viewSellerBooks } = require('./viewSellers.contoller');

viewSellersRouter.get('/', allSellers);
viewSellersRouter.get('/:sellerId', viewSellerProfile);
viewSellersRouter.get('/:sellerId/books', viewSellerBooks);

module.exports = viewSellersRouter;