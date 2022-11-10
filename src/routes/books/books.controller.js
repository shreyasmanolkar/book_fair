const pool = require('../../models/database');
const authId = require('../../auth/authId');

async function allBooks(req, res){
    try{

        let id = authId[authId.length - 1];

        const allBooks = await pool.query(
            `SELECT b.name, b.image_url, SUBSTRING( b.description FOR 300) , b.price, s.full_name AS "seller_name", s.seller_id, b.book_id
            FROM "public"."books" AS "b"
            JOIN "public"."sellers" AS "s"
            ON b.seller_id = s.seller_id`
        );

        let data = {
            allBooks: allBooks.rows
        };

        res.render('allBooks', {
            data,
            authId: id,
            layout: "main.handlebars"
        })

    } catch(err){
        console.log(err);
    }
};

async function bookDetail(req, res){
    try{

        let id = authId[authId.length - 1];

        const bookId = Number(req.params.bookId);

        const bookInfo = await pool.query(
            `SELECT b.name, b.image_url, s.full_name, b.price, b.description, s.seller_id, b.book_id
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
            authId: id,
            layout: 'main.handlebars'
        });
        
    } catch(err){
        console.log(err);
    }
};

async function addToCart(req, res){
    try{
        const buyerId = authId[authId.length - 1];
        let { quantity, bookId } = req.body;
        let errors = [];

        // check for previous orders

        const cartId = await pool.query(
            `SELECT cart_id
            FROM "public"."carts"
            WHERE buyer_id = $1`,
            [buyerId]
        );

        const seller = await pool.query(
            `SELECT seller_id 
            FROM "public"."books"
            WHERE book_id = $1`,
            [bookId]
        );

        let bookSellerId = seller.rows[0].seller_id;

        if(!cartId.rows[0].cart_id){

            res.redirect('/buyer/login');
            
        } else {
            let cart = cartId.rows[0].cart_id;

            let prevSeller = await pool.query(
                `SELECT o.order_id, o.book_id, o.quantity, b.full_name, bo.seller_id
                FROM "public"."orders" AS "o"
                JOIN "public"."carts" AS "c"
                ON c.cart_id = o.cart_id
                JOIN "public"."buyers" AS "b"
                ON c.buyer_id = b.buyer_id
                JOIN "public"."books" AS "bo"
                ON o.book_id = bo.book_id
                WHERE c.cart_id = $1
                ORDER BY order_id DESC
                LIMIT 1`,
                [cart]
            );

            if (!prevSeller.rows[0] || prevSeller.rows[0].seller_id == bookSellerId ){
                
                await pool.query(
                    `INSERT INTO orders(
                        cart_id,
                        book_id,
                        quantity
                    ) VALUES (
                        $1,
                        $2,
                        $3
                    )`,
                    [cart, bookId, quantity]
                )

                res.redirect(`/buyer/${buyerId}/cart`);

            } else {

                errors.push({ text: 'You can only buy from one seller!' });

                const bookInfo = await pool.query(
                    `SELECT b.name, b.image_url, s.full_name, b.price, b.description, s.seller_id, b.book_id
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
                    errors,
                    layout: 'main.handlebars'
                });
            }
        }

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    allBooks,
    bookDetail,
    addToCart
};