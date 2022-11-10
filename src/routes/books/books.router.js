const express = require('express');
const booksRouter = express.Router();

const {authUser} = require('../../auth/basicAuth');
const { setBuyer } = require('../../auth/setUser');

booksRouter.use(express.json());

const {
    allBooks,
    bookDetail,
    addToCart
} = require('./books.controller');

booksRouter.get('/', allBooks);

booksRouter.get('/:bookId', setBuyer, authUser, bookDetail);

booksRouter.post('/cart', addToCart);

module.exports = booksRouter;