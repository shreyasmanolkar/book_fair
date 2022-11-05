const express = require('express');
const app = express();
const pool = require('./models/database');

const sellerRouter = require('./routes/sellers/sellers.router');
const buyerRouter = require('./routes/buyers/buyers.router');
const viewSellersRouter = require('./routes/viewSellers/viewSellers.router');

// handlebars
app.engine(
    "handlebars",
    exphbs.engine({
      extname: "handlebars",
      defaultLayout: "main.handlebars",
      layoutsDir: "views/layouts/"
    })
);
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {    
    try{
        const allBooks = await pool.query(
            `SELECT * FROM "public"."books"`
        );
        res.json(allBooks.rows);
    } catch(err){
        console.error(err.message);
    }
});

app.use('/seller', sellerRouter);
app.use('/buyer', buyerRouter);
app.use('/sellers', viewSellersRouter);

module.exports = app;