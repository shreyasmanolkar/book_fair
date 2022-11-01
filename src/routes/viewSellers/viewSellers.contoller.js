const pool = require('../../models/database');

async function allSellers(req, res){
    try {
        const allSellers = await pool.query(
            `SELECT * 
            FROM "public"."sellers"`,
        );

        res.json(allSellers.rows);

    } catch (error) {
        console.log(error);
    }
};

async function viewSellerProfile(req, res){   
    try {
        const sellerId = Number(req.params.sellerId);

        const sellerDetails = await pool.query(
            `SELECT s.seller_id, s.full_name AS "full_name", s.email, sh.shop_name
            FROM "public"."sellers" AS "s"
            JOIN "public"."shops" AS  "sh" 
            ON sh.seller_id = s.seller_id
            WHERE s.seller_id = $1`,
            [sellerId]
        );

        if(!sellerDetails.rows[0]){
            res.json('incomplete profile of seller');
        } else {
            res.json(sellerDetails.rows);   
        }
    } catch (error) {
        console.log(error);
    }
};

async function viewSellerBooks(req, res){  
    try {
        const sellerId = Number(req.params.sellerId);

        const sellerBooks = await pool.query(
            `SELECT * 
            FROM "public"."books"
            WHERE seller_id = $1`,
            [sellerId]
        );
            
        if(!sellerBooks.rows[0]){
            res.json("seller havn't add books yet!");
        } else {
            res.json(sellerBooks.rows);
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