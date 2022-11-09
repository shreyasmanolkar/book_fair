const pool = require('../../models/database');
const authId = require('../../auth/authId');

function sellerAuth(req, res){
    res.render('seller-sign-log',{
        layout: 'dashboard.handlebars'
    });
};

async function sellerSignupDisplay(req, res){
    res.render('seller-sign-up',{
        layout: 'dashboard.handlebars'
    });
}

async function sellerSignup(req, res){
    try{
        let { full_name, email, phone_number } = req.body;
        let errors = [];

        // validate fields
        if(!full_name){
            errors.push({ text: 'Please add your full name' });
        }

        if(!email){
            errors.push({ text: 'Please add your email' });
        }

        if(!phone_number){
            errors.push({ text: 'Please add your phone number' });
        }

        // check for errors

        if(errors.length > 0){
            res.render('seller-sign-up', {
                errors,
                full_name,
                email,
                phone_number,
                layout: 'dashboard.handlebars'
            });
        } else {
            full_name = full_name.toLowerCase();
            email = email.toLowerCase();

            // if seller already exist

            const user = await pool.query(
                `SELECT *
                FROM "public"."sellers"
                WHERE full_name = $1 
                AND email = $2`,
                [full_name, email]
            );

            // create new buyer

            if(!user.rows.email){
                await pool.query(
                    `INSERT INTO sellers (
                        full_name,
                        email,
                        phone_number
                    ) VALUES (
                        $1,
                        $2,
                        $3
                    )`,
                    [full_name, email, phone_number]
                );

                res.redirect('/seller/login');
            
            } else {
            
                res.redirect('/seller/login');
            
            }

        }

    } catch(err){
        console.log(err);
    }
};

async function sellerLoginDisplay(req, res){
    res.render('seller-log-in',{
        layout: 'dashboard.handlebars'
    });
}

async function sellerLogin(req, res){
    try{
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
            res.render('seller-log-in', {
                errors,
                full_name,
                email,
                layout: 'dashboard.handlebars'
            });
        } else {

            const user = await pool.query(
                `SELECT *
                FROM "public"."sellers"
                WHERE full_name = $1 
                AND email = $2`,
                [full_name, email]
            );
    
            if(!user.rows){

                errors.push({ text: 'Invalid User Name or Email' });

                res.render('seller-log-in',{
                    errors,
                    full_name,
                    email,
                    layout: 'dashboard.handlebars'
                });
    
            } else {

                const user_id = user.rows.map(sell => sell.seller_id);
                req.user = user_id[0];

                authId.push(user_id[0]);

                res.redirect(`/seller/${req.user}`);
            }
        }
    } catch(err){
        console.log(err);
    }

};

async function addNewShop(req, res){

    // incomplete 
   
    res.render('addNewShop', {
        layout: 'dashboard.handlebars'
    });
}

async function addNewShopPost(req, res){

    try{

        const shop_name = req.body.shop_name.toLowerCase();


        await pool.query(

        )

        // res.render('addNewShop', {
        //     layout: 'dashboard.handlebars'
        // });

    } catch(err){
        console.log(err);
    }
}

async function sellerProfile(req, res){
    try {
        const sellerId = Number(req.params.sellerId);

        const sellerDetails = await pool.query(
            `SELECT seller_id, full_name, email, phone_number
            FROM "public"."sellers"
            WHERE seller_id = $1`,
            [sellerId]
        );
    
        if(!sellerDetails.rows[0]){
            // invalid login 
            // create Shop  
            res.json('unable to find shop of seller');
        } else {
            let data = {
                sellerDetails: sellerDetails.rows
            }

            res.render('sellerDashboard', {
                data,
                layout: 'dashboard.handlebars'
            });
        }
    } catch (error) {
        console.log(error);
    }
};

async function sellersBooks(req, res){
    try {
        const sellerId = Number(req.params.sellerId);

        const sellerIdInfo = await pool.query(
            `SELECT seller_id
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
            res.render('dashboardBooksNotFound', {
                layout: 'dashboard.handlebars'
            });
        } else {
            let data = {
                sellerIdInfo: sellerIdInfo.rows,
                sellerBooks: sellerBooks.rows
            }

            res.render('dashboardBooks', {
                data,
                layout: 'dashboard.handlebars'
            });

            // res.json(data);
        }
    } catch (error) {
        console.log(error)
    }
};

async function addNewBookDisplay(req, res){
    res.render('addNewBookDisplay', {
        layout: 'dashboard.handlebars'
    });
}

async function addNewBook(req, res){
    try {
        const name = req.body.name.toLowerCase();
        const stock = req.body.stock;
        const image_url = req.body.image_url;
        const seller_id = req.body.seller_id;
        const price = req.body.price;
        const description = req.body.description;
    
        await pool.query(
            `INSERT INTO books (
                "name",
                stock,
                image_url,
                seller_id,
                price,
                "description"
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )`,
            [name, stock, image_url, seller_id, price, description]
        )
    
        res.json(`Book Added`);

    } catch (error) {
        console.log(error)
    }
};

async function sellersOrders(req, res){
    try {
        const sellerId = Number(req.params.sellerId);

        const sellerIdInfo = await pool.query(
            `SELECT seller_id
            FROM "public"."sellers"
            WHERE seller_id = $1`,
            [sellerId]
        );

        const shopDetail = await pool.query(
            `SELECT * 
            FROM "public"."shops"
            WHERE seller_id = $1`,
            [sellerId]
        );
        
        if(!shopDetail.rows[0]){
            res.json('create shop');
        } else {
            const shopId = shopDetail.rows[0].shop_id;

            const sellersOrders = await pool.query(
                `SELECT 
                o.order_id, 
                o.book_id, 
                bo.image_url,
                c.buyer_id, 
                b.full_name AS "buyer_name",
                b.address AS "buyer_address",
                bo.price,
                bo.name,
                o.quantity
                FROM "public"."orders" AS "o"
                JOIN "public"."carts" AS "c" ON o.cart_id = c.cart_id
                JOIN "public"."buyers" AS "b" ON c.buyer_id = b.buyer_id
                JOIN "public"."books" AS "bo" ON bo.book_id = o.book_id
                WHERE o.shop_id = $1`,
                [shopId]
            )
        
            if(!sellersOrders.rows[0]){
                res.render('dashboardOrdersNotFound', {
                    layout: 'dashboard.handlebars'
                });
            } else {
    
                let data = {
                    sellerIdInfo: sellerIdInfo.rows,
                    sellersOrders: sellersOrders.rows
                };
    
                res.render('dashboardOrders', {
                    data,
                    layout: 'dashboard.handlebars'
                });
            }
        }
    

    } catch (error) {
        console.log(error)
    } 
};

module.exports = {
    sellerAuth,
    sellerSignupDisplay,
    sellerSignup,
    sellerLogin,
    sellerLoginDisplay,
    addNewShop,
    addNewShopPost,
    sellerProfile,
    sellersBooks,
    addNewBook,
    sellersOrders,
    addNewBookDisplay
};