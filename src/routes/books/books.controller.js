const pool = require('../../models/database');

async function allBooks(req, res){
    try{

        const allBooks = await pool.query(
            `SELECT b.name, b.image_url, SUBSTRING( b.description FOR 300) , b.price, s.full_name AS "seller_name"
            FROM "public"."books" AS "b"
            JOIN "public"."sellers" AS "s"
            ON b.seller_id = s.seller_id`
        );

        let data = {
            allBooks: allBooks.rows
        };

        res.render('allBooks', {
            data,
            layout: "main.handlebars"
        })

    } catch(err){
        console.log(err);
    }
};

async function bookDetail(req, res){
    try{

        const bookId = Number(req.params.bookId);

        const bookInfo = await pool.query(
            `SELECT b.name, b.image_url, s.full_name, b.price, b.description 
            FROM "public"."books" AS "b"
            JOIN "public"."sellers" AS "s" 
            ON s.seller_id = b.seller_id
            WHERE book_id = $1`,
            [bookId]
        );

        let data = {
            bookInfo: bookInfo.rows
        };

        res.render('bookDetail', {
            data,
            layout: 'main.handlebars'
        });
        
    } catch(err){
        console.log(err);
    }
};

module.exports = {
    allBooks,
    bookDetail
};