const express = require('express');
const buyersRouter = express.Router();

const { authBuyer, authUser } = require('../../auth/basicAuth');
const { setUser } = require('../../auth/setUser'); 
const { ROLE } = require('../../models/data');

const { buyerAuth,
    buyerSignup,
    buyerLogin,
    buyerProfile,
    buyerCart} = require('./buyers.controller');

buyersRouter.use(express.json());

buyersRouter.get('/', buyerAuth);
buyersRouter.post('/new', buyerSignup);
buyersRouter.post('/login', buyerLogin);

buyersRouter.use(setUser);
buyersRouter.use(authUser);
// buyersRouter.use(authRole(ROLE.BUYER));

buyersRouter.get('/:buyerId', buyerProfile);
buyersRouter.get('/:buyerId/cart', buyerCart);

module.exports = buyersRouter;