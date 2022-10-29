const express = require('express');
const buyersRouter = express.Router();

const { buyerAuth,
    buyerSignup,
    buyerLogin,
    buyerProfile,
    buyerCart} = require('./buyers.controller');

buyersRouter.get('/', buyerAuth);
buyersRouter.get('/new', buyerSignup);
buyersRouter.get('/login', buyerLogin);
buyersRouter.get('/:buyerId', buyerProfile);
buyersRouter.get('/:buyerId/cart', buyerCart);

module.exports = buyersRouter;