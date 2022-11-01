const express = require('express');
const viewSellersRouter = express.Router();
const { authUser, authBuyer } = require('../../auth/basicAuth');
const { setUser } = require('../../auth/setUser');

const {     allSellers,
    viewSellerProfile,
    viewSellerBooks } = require('./viewSellers.contoller');

viewSellersRouter.use(express.json());

viewSellersRouter.use(setUser);
viewSellersRouter.use(authUser);

viewSellersRouter.get('/', allSellers);
viewSellersRouter.get('/:sellerId', viewSellerProfile);
viewSellersRouter.get('/:sellerId/books', viewSellerBooks);

module.exports = viewSellersRouter;