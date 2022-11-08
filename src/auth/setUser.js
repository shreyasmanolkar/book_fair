const pool = require('../models/database');
const authId = require('./authId');

// async function setUser(req, res, next){
//     const userId = req.body.userId; 

//     const userAuth = await pool.query(
//         `SELECT * 
//         FROM "public"."sellers"
//         WHERE seller_id = $1`,
//         [userId]
//         );

//         if(userAuth.rows){
//             const user_id = userAuth.rows.map(usr => usr.seller_id);
//             req.user = user_id;
//         }
//     next();
// };

async function setBuyer(req, res, next){
    
    const buyerId = authId[0];

    const userAuth = await pool.query(
        `SELECT * 
        FROM "public"."buyers"
        WHERE buyer_id = $1`,
        [buyerId]
        );

        if(userAuth.rows){
            const user_id = userAuth.rows.map(usr => usr.buyer_id);
            req.user = user_id;
        }
    next();
};

module.exports = {
    setBuyer
};