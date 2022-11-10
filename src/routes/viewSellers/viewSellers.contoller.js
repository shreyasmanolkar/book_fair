const pool = require('../../models/database');
const authId = require('../../auth/authId');

async function allSellers(req, res){
    try {

        let id = authId[authId.length - 1];

        const allSellers = await pool.query(
            `SELECT * 
            FROM "public"."sellers"`,
        );

        let data = {
            allSellers: allSellers.rows
        }

        res.render('allSellers', {
            data,
            authId: id,
            layout: 'main.handlebars'
        });

    } catch (error) {
        console.log(error);
    }
};

async function viewSellerProfile(req, res){   
    try {
        let id = authId[authId.length - 1];
        const sellerId = Number(req.params.sellerId);

        const sellerDetails = await pool.query(
            `SELECT * 
            FROM "public"."sellers" 
            WHERE seller_id = $1`,
            [sellerId]
        );

        if(!sellerDetails.rows[0]){
            res.render('sellerNotFound',{
                authId: id,
                layout: 'main.handlebars'
            });
        } else {

            let data = {
                sellerProfile: sellerDetails.rows
            };

            res.render('viewSellerProfile', {
                data,
                authId: id,
                layout: 'main.handlebars'
            });
        }
    } catch (error) {
        console.log(error);
    }
};

async function viewSellerBooks(req, res){  
    try {
        let id = authId[authId.length - 1];
        const sellerId = Number(req.params.sellerId);

        const sellerName = await pool.query(
            `SELECT full_name
            FROM "public"."sellers"
            WHERE seller_id = $1`,
            [sellerId]
        );

        const sellerBooks = await pool.query(
            `SELECT b.name, b.image_url, SUBSTRING( b.description FOR 300) , b.price, s.full_name AS "seller_name", s.seller_id, b.book_id
            FROM "public"."books" AS "b"
            JOIN "public"."sellers" AS "s"
            ON b.seller_id = s.seller_id
            WHERE b.seller_id = $1`,
            [sellerId]
        );
            
        if(!sellerBooks.rows[0]){
            res.render('viewSellerBooksNotFound', {
                authId: id,
                layout: 'main.handlebars'
            });
        } else {

            let data = {
                sellerName: sellerName.rows,
                sellerBooks: sellerBooks.rows
            }
            
            res.render('viewSellerBooks', {
                data,
                authId: id,
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