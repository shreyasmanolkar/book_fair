const express = require('express');
const app = express();

const sellerRouter = require('./routes/sellers/sellers.router');
const buyerRouter = require('./routes/buyers/buyers.router');
const viewSellersRouter = require('./routes/viewSellers/viewSellers.router');

app.get('/', (req, res) => {
    res.send('Home page');
});

app.use('/seller', sellerRouter);
app.use('/buyer', buyerRouter);
app.use('/sellers', viewSellersRouter);

module.exports = app;