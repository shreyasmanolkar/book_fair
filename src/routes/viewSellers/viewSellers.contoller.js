const pool = require('../../models/database');

async function allSellers(req, res){
    try {
        const allSellers = await pool.query(
            `SELECT * 
            FROM "public"."sellers"`,
        );

        let data = {
            allSellers: allSellers.rows
        }

        res.render('allSellers', {
            data,
            layout: 'main.handlebars'
        });

    } catch (error) {
        console.log(error);
    }
};

async function viewSellerProfile(req, res){   
    try {
        const sellerId = Number(req.params.sellerId);

        const sellerDetails = await pool.query(
            `SELECT s.seller_id, s.full_name AS "full_name", s.email, sh.shop_name, s.phone_number
            FROM "public"."sellers" AS "s"
            JOIN "public"."shops" AS  "sh" 
            ON sh.seller_id = s.seller_id
            WHERE s.seller_id = $1`,
            [sellerId]
        );

        if(!sellerDetails.rows[0]){
            res.render('sellerNotFound',{
                layout: 'main.handlebars'
            });
        } else {

            let data = {
                sellerProfile: sellerDetails.rows
            };

            res.render('viewSellerProfile', {
                data,
                layout: 'main.handlebars'
            });
        }
    } catch (error) {
        console.log(error);
    }
};

async function viewSellerBooks(req, res){  
    try {
        const sellerId = Number(req.params.sellerId);

        const sellerName = await pool.query(
            `SELECT full_name
            FROM "public"."sellers"
            WHERE seller_id = $1`,
            [sellerId]
        );

        const sellerBooks = await pool.query(
            `SELECT b.name, b.image_url, SUBSTRING( b.description FOR 300) , b.price, s.full_name AS "seller_name", s.seller_id
            FROM "public"."books" AS "b"
            JOIN "public"."sellers" AS "s"
            ON b.seller_id = s.seller_id
            WHERE b.seller_id = $1`,
            [sellerId]
        );
            
        if(!sellerBooks.rows[0]){
            res.render('viewSellerBooksNotFound', {
                layout: 'main.handlebars'
            });
        } else {

            let data = {
                sellerName: sellerName.rows,
                sellerBooks: sellerBooks.rows
            }
            
            res.render('viewSellerBooks', {
                data,
                layout: 'main.handlebars'
            });
        }

    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    allSellers,
    viewSellerProfile,
    viewSellerBooks
};