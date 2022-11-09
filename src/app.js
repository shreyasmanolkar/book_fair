const express = require('express');
const app = express();
const pool = require('./models/database');
const exphbs = require('express-handlebars');
const path = require('path');

const sellerRouter = require('./routes/sellers/sellers.router');
const buyerRouter = require('./routes/buyers/buyers.router');
const viewSellersRouter = require('./routes/viewSellers/viewSellers.router');
const booksRouter = require('./routes/books/books.router');
const authId = require('./auth/authId');

// handlebars
app.engine(
    "handlebars",
    exphbs.engine({
      extname: "handlebars",
      defaultLayout: false,
      layoutsDir: "src/views/layouts/"
    })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// body parser
app.use(express.urlencoded({ extended: false }));


// set static folder

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {    
    try{

        let id = authId[authId.length - 1];

        const trending = await pool.query(
            `SELECT b.name, b.image_url, b.price , s.full_name, b.book_id, s.seller_id
            FROM "public"."books" AS "b"
            JOIN "public"."sellers" AS "s"
            ON b.seller_id = s.seller_id
            ORDER BY book_id DESC 
            LIMIT 5`
        );

        const topSelling = await pool.query(
            `SELECT b.price, b.stock, b.image_url, b.name, s.full_name, b.book_id, s.seller_id
            FROM "public"."orders" AS "o" 
            JOIN "public"."books" AS "b" 
            ON b.book_id = o.book_id
            JOIN "public"."sellers" AS "s"
            ON b.seller_id = s.seller_id
            ORDER BY o.order_id DESC 
            LIMIT 5`
        );

        const bestINStock = await pool.query(
            `SELECT b.name, b.image_url, b.price , s.full_name, b.book_id, s.seller_id
            FROM "public"."books" AS "b"
            JOIN "public"."sellers" AS "s"
            ON b.seller_id = s.seller_id
            ORDER BY b.stock DESC 
            LIMIT 5`
        );
        
        const recomended = await pool.query(
            `SELECT b.name, b.image_url, b.price , s.full_name, b.book_id, s.seller_id
            FROM "public"."books" AS "b"
            JOIN "public"."sellers" AS "s"
            ON b.seller_id = s.seller_id
            ORDER BY b.price DESC 
            LIMIT 5`
        );

        let data = {
            trending: trending.rows,
            topSelling: topSelling.rows,
            bestINStock: bestINStock.rows,
            recomended: recomended.rows
        };
        
        res.render('home', {
            data,
            title: 'Home Page',
            id,
            layout: 'main.handlebars'
        });

        // res.json(data);
        
    } catch(err){
        console.error(err.message);
    }
});

app.use('/seller', sellerRouter);
app.use('/buyer', buyerRouter);
app.use('/sellers', viewSellersRouter);
app.use('/books', booksRouter);

module.exports = app;