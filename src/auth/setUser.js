 const pool = require('../models/database');

async function setUser(req, res, next){
    const userId = req.body.userId; 

    const userAuth = await pool.query(
        `SELECT * 
        FROM "public"."sellers"
        WHERE seller_id = $1`,
        [userId]
        );

        if(userAuth.rows){
            const user_id = userAuth.rows.map(usr => usr.seller_id);
            req.user = user_id;
        }
    next();
};

module.exports = {
    setUser
};