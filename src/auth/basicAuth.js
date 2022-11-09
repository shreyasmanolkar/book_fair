const pool = require('../models/database');
const authId = require('./authId');

function authUser(req, res, next){
    let reqUser = req.user;
    let errors = [];

    if(reqUser == null || undefined){
        res.status(403);

        errors.push({text: 'You Need To Sign in'});

        return res.render('buyer-log-in', {
            errors,
            layout: 'main.handlebars'
        });
    }
    next();
};

function authUserDashboard(req, res, next){
    let reqUser = req.user;
    let errors = [];

    if(reqUser == null || undefined){
        res.status(403);

        errors.push({text: 'You Need To Sign in'});

        return res.render('seller-log-in', {
            errors,
            layout: 'dashboard.handlebars'
        });
    }
    next();
};

async function authSeller(req, res, next){    
    const errors = [];
    const paramsSellerId = Number(req.params.sellerId);

    if(authId[authId.length - 1] !== paramsSellerId){
        res.status(401);

        errors.push({ text: 'Access Not Allowed !' });

        return res.render('seller-log-in', {
            errors,
            layout: 'dashboard.handlebars'
        });
    };
    next();
};


// async function authSeller(req, res, next){    
//     const paramsSellerId = Number(req.params.sellerId);
//     const full_name = req.body.full_name;
//     const authId = await pool.query(
//         `SELECT seller_id
//         FROM "public"."sellers"
//         WHERE full_name = $1`,
//         [full_name]
//     );
//     const validId = authId.rows.map(auth => auth.seller_id);
//     if(validId[0] !== paramsSellerId){
//         res.status(401);
//         return res.send('Not Allowed!');
//     }   
//     next();
// };

// async function authBuyer(req, res, next){    
//     const paramsBuyerId = Number(req.params.buyerId);

//     const authId = await pool.query(
//         `SELECT buyer_id
//         FROM "public"."buyers"
//         WHERE full_name = $1`,
//         [full_name]
//     );

//     const validId = authId.rows.map(auth => auth.buyer_id);
    
//     if(validId[0] !== paramsBuyerId){
//         res.status(401);
//         return res.send('Not Allowed!');
//     }   
    
//     next();
// };


async function authBuyer(req, res, next){    
    const errors = [];
    const paramsBuyerId = Number(req.params.buyerId);
    
    if(authId[authId.length - 1] !== paramsBuyerId){
        res.status(401);

        errors.push({text: 'Access Not Allowed !'});
    
        return res.render('buyer-log-in', {
            errors,
            layout: 'main.handlebars'
        });
    };
    
    next();
};

module.exports = {
    authUser,
    authUserDashboard,
    authSeller,
    authBuyer
};