const pool = require('../../models/database');
const authId = require('../../auth/authId');

function buyerAuth(req, res){
    
    let id = authId[authId.length - 1];

    res.render('buyer-sign-log', {
        authId: id,
        title: 'Buyer Authentication',
        layout: 'main.handlebars'
    });
};

async function buyerSignupDisplay(req, res){

    let id = authId[authId.length - 1];

    res.render('buyer-sign-up', {
        authId: id,
        title: 'Sign Up',
        layout: 'main.handlebars'
    });
}

async function buyerSignup(req, res){
    
    try{
        let id = authId[authId.length - 1];
        let { full_name, email, address, phone_number } = req.body;     
        let errors = [];

        // validate fields
        if(!full_name){
            errors.push({ text: 'Please add your full name ' })
        }

        if(!email){
            errors.push({ text: 'Please add your email' })
        }
        
        if(!address){
            errors.push({ text: 'Please add your address' })
        }

        if(!phone_number){
            errors.push({ text: 'Please add your phone number ' })
        }

        // check for errors
        
        if(errors.length > 0){
            res.render('buyer-sign-up', {
                errors,
                full_name, 
                email, 
                address, 
                phone_number,
                authId: id,
                title: 'Sign Up',
                layout: 'main.handlebars'
            });
        } else {
            full_name = full_name.toLowerCase();
            email = email.toLowerCase();
            address = address.toLowerCase();
    
            // if buyer already exist
    
            const user = await pool.query(
                `SELECT *
                FROM "public"."buyers"
                WHERE full_name = $1 
                AND email = $2`,
                [full_name, email]
            );
    
            // create new buyer
    
            if(!user.rows.email){
                await pool.query(
                    `INSERT INTO buyers (
                        full_name,
                        email,
                        phone_number,
                        address
                    ) VALUES (
                        $1,
                        $2,
                        $3,
                        $4
                    )`,
                    [full_name, email, phone_number, address]
                );
        
                let buyer = await pool.query(
                    `SELECT buyer_id 
                    FROM "public"."buyers" 
                    WHERE full_name = $1`,
                    [full_name]
                );
        
                const buyerId = buyer.rows.map(buy => buy.buyer_id);
                    
                // create cart for buyer
    
                pool.query(
                    `INSERT INTO carts (
                        buyer_id
                    ) VALUES (
                        $1
                    )`,
                    [buyerId[0]]
                );

                res.redirect('/buyer/login');
            
            } else {

                res.redirect('/buyer/login');
            }
        }  
    } catch(err){
        console.log(err);
    }
};

async function buyerLoginDisplay(req, res){
    let id = authId[authId.length - 1];
    res.render('buyer-log-in', {
        authId: id,
        title: 'Buyer Log in',
        layout: 'main.handlebars'
    });
}

async function buyerLogin(req, res){
    try{
        let id = authId[authId.length - 1];
        let { full_name, email } = req.body;
        let errors = [];

        // validate fields
        if(!full_name){
            errors.push({ text: 'Please add full name' });
        }

        if(!email){
            errors.push({ text: 'Please add email' });
        }

        // check for errors

        if(errors.length > 0){
            res.render('buyer-log-in', {
                errors,
                full_name,
                email,
                authId: id,
                title: 'Buyer Log In',
                layout: 'main.handlebars'
            });
        } else {

            const user = await pool.query(
                `SELECT *
                FROM "public"."buyers"
                WHERE full_name = $1 
                AND email = $2`,
                [full_name, email]
            );
    
            if(!user.rows){

                errors.push({text: 'Invalid User Name or Email'});

                res.render('buyer-log-in', {
                    errors,
                    full_name,
                    email,
                    authId: id,
                    title: 'Buyer Log In',
                    layout: 'main.handlebars'
                });

            } else {
                const user_id = user.rows.map(buy => buy.buyer_id);
                req.user = user_id[0];

                authId.push(user_id[0]);

                res.redirect(`/buyer/${req.user}`);
            }
        }

    } catch(err){
        console.log(err);
    }
};

async function buyerProfile(req, res){
    try {
        let id = authId[authId.length - 1];
        const buyerId = Number(req.params.buyerId);

        const buyerDetails = await pool.query(
            `SELECT b.buyer_id, b.full_name, b.email, c.cart_id, b.phone_number, b.address 
            FROM "public"."buyers" AS "b"
            JOIN "public"."carts" AS "c" 
            ON b.buyer_id = c.buyer_id
            WHERE b.buyer_id = $1;`,
            [buyerId]
        );
        
        if(!buyerDetails.rows[0]){
            res.render('buyerProfileNotFound',{
                authId: id,
                title: 'Profile Not Found',
                layout: 'main.handlebars'
            });
        } else {

            let data = {
                buyerDetails: buyerDetails.rows
            };

            res.render('buyerProfile', {
                data,
                authId: id,
                title: 'Buyer Profile',
                layout: 'main.handlebars'
            });
        }
    
    } catch (error) {
        console.log(error);
    }
};

async function buyerCart(req, res){
    try {
        let id = authId[authId.length - 1];
        const buyerId = Number(req.params.buyerId);
        
        const orderDetail = await pool.query(
            `SELECT 
            o.cart_id, 
            o.order_id, 
            o.quantity, 
            b.name AS "book_name", 
            b.image_url,
            b.price,
            b.book_id,
            s.full_name AS "seller_name"
            FROM "public"."orders" AS "o" 
            JOIN "public"."books" AS "b" 
            ON o.book_id = b.book_id
            JOIN "public"."carts" AS "buy"
            ON o.cart_id = buy.cart_id
            JOIN "public"."sellers" AS "s"
            ON b.seller_id = s.seller_id
            WHERE buy.buyer_id = $1`,
            [buyerId]
        );

        const total = await pool.query(
            `SELECT 
            SUM(o.quantity * b.price)
            FROM "public"."orders" AS "o" 
            JOIN "public"."books" AS "b" 
            ON o.book_id = b.book_id
            JOIN "public"."carts" AS "buy"
            ON o.cart_id = buy.cart_id
            JOIN "public"."sellers" AS "s"
            ON b.seller_id = s.seller_id
            WHERE buy.buyer_id = $1`,
            [buyerId]
        );

        if(!orderDetail.rows[0]){
            res.render('emptyCart', {
                authId: id,
                title: 'Cart',
                layout: 'main.handlebars'
            });
        } else {

            let data = {
                orderDetail: orderDetail.rows,
                total: total.rows
            };

            res.render('buyerCart', {
                data,
                authId: id,
                title: 'Cart',
                layout: 'main.handlebars'
            });
        }

    } catch (error) {
        console.log(error)
    }
};

async function deleteCartBook(req, res){
    const buyerId = authId[authId.length - 1];
    let { bookId } = req.body;

    let cart = await pool.query(
        `SELECT cart_id
        FROM "public"."carts"
        WHERE buyer_id = $1`,
        [buyerId]
    );

    let cartId = cart.rows[0].cart_id;

    await pool.query(
        `DELETE FROM "public"."orders"
        WHERE book_id = $1
        AND cart_id = $2`,
        [bookId, cartId]
    );

    res.redirect(`/buyer/${buyerId}/cart`);
    
};

module.exports = {
    buyerAuth,
    buyerSignupDisplay,
    buyerSignup,
    buyerLoginDisplay,
    buyerLogin,
    buyerProfile,
    buyerCart,
    deleteCartBook
};