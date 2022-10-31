const pool = require('../models/database');

function authUser(req, res, next){
    let reqUser = req.user;

    if(reqUser == null || undefined){
        res.status(403);
        return res.send('you need to sign in');
    }
    next();
};

function authRole(role){
    return (req, res, next)=>{
        if(req.user[0].seller_id !== role){
            res.status(401);
            return res.send('Not Allowed!');
        }

        next();
    }
};

async function authSeller(req, res, next){    
    const paramsSellerId = Number(req.params.sellerId);
    const full_name = req.body.full_name;
    const authId = await pool.query(
        `SELECT seller_id
        FROM "public"."sellers"
        WHERE full_name = $1`,
        [full_name]
    );
    const validId = authId.rows.map(auth => auth.seller_id);
    if(validId[0] !== paramsSellerId){
        res.status(401);
        return res.send('Not Allowed!');
    }   
    next();
};

async function authBuyer(req, res, next){    
    const paramsBuyerId = Number(req.params.buyerId);
    const full_name = req.body.full_name;
    const authId = await pool.query(
        `SELECT buyer_id
        FROM "public"."buyers"
        WHERE full_name = $1`,
        [full_name]
    );
    const validId = authId.rows.map(auth => auth.buyer_id);
    if(validId[0] !== paramsBuyerId){
        res.status(401);
        return res.send('Not Allowed!');
    }   
    next();
};

module.exports = {
    authUser,
    authRole,
    authSeller,
    authBuyer
};