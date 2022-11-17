const express = require('express');
const buyersRouter = express.Router();

const { authBuyer, authUser } = require('../../auth/basicAuth');
const { setBuyer } = require('../../auth/setUser'); 

const { buyerAuth,
    buyerSignupDisplay,
    buyerSignup,
    buyerLoginDisplay,
    buyerLogin,
    buyerProfile,
    deleteCartBook,
    buyerCart} = require('./buyers.controller');

buyersRouter.use(express.json());

buyersRouter.get('/', buyerAuth);

buyersRouter.get('/new', buyerSignupDisplay);
buyersRouter.post('/new', buyerSignup);

buyersRouter.get('/login', buyerLoginDisplay);
buyersRouter.post('/login', buyerLogin);

buyersRouter.use(setBuyer);
buyersRouter.use(authUser);

buyersRouter.get('/:buyerId', authBuyer, buyerProfile);
buyersRouter.get('/:buyerId/cart', authBuyer, buyerCart);

buyersRouter.post('/bookDelete', deleteCartBook);

module.exports = buyersRouter;