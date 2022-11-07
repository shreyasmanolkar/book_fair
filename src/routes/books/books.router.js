const express = require('express');
const booksRouter = express.Router();

booksRouter.use(express.json());

const {
    allBooks,
    bookDetail
} = require('./books.controller');

booksRouter.get('/', allBooks);
booksRouter.get('/:bookId', bookDetail);

module.exports = booksRouter;