const pool = require('../../models/database');

function sellerAuth(req, res){
    res.send("seller authorization");
};

async function sellerSignup(req, res){
    try{
        const full_name = req.body.full_name.toLowerCase();
        const email = req.body.email.toLowerCase();

        const user = await pool.query(
            `SELECT *
            FROM "public"."sellers"
            WHERE full_name = $1 
            AND email = $2`,
            [full_name, email]
        );

        if(!user.rows.email){
            await pool.query(
                `INSERT INTO sellers (
                    full_name,
                    email
                ) VALUES (
                    $1,
                    $2
                )`,
                [full_name, email]
            );
            res.json("Seller Signed up");
        } else {
            res.json('Seller already exist');
        }

    } catch(err){
        console.log(err);
    }
};

async function sellerLogin(req, res){
    try{
        const full_name = req.body.full_name.toLowerCase();
        const email = req.body.email.toLowerCase();

        const user = await pool.query(
            `SELECT *
            FROM "public"."sellers"
            WHERE full_name = $1 
            AND email = $2`,
            [full_name, email]
        );

        if(user){
            const user_id = user.rows;
            req.user = user_id;
            res.json(req.user);

            console.log(req.user)

        } else {
            res.json({"status": "invalid username or email"});
        }
    } catch(err){
        console.log(err);
    }

};

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

        const sellerBooks = await pool.query(
            `SELECT b.name, b.image_url, SUBSTRING( b.description FOR 300) , b.price, s.full_name AS "seller_name"
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
                sellerBooks: sellerBooks.rows
            }

            res.render('dashboardBooks', {
                data,
                layout: 'dashboard.handlebars'
            });
        }
    } catch (error) {
        console.log(error)
    }
};

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

        const shopDetail = await pool.query(
            `SELECT * 
            FROM "public"."shops"
            WHERE seller_id = $1`,
            [sellerId]
        );
    
        const shopId = shopDetail.rows[0].shop_id;
    
        const sellersOrders = await pool.query(
            `SELECT 
            o.order_id, 
            o.book_id, 
            c.buyer_id, 
            b.full_name,
            o.quantity
            FROM "public"."orders" AS "o"
            JOIN "public"."carts" AS "c" ON o.cart_id = c.cart_id
            JOIN "public"."buyers" AS "b" ON c.buyer_id = b.buyer_id
            WHERE o.shop_id = $1 `,
            [shopId]
        )
    
        res.json(sellersOrders.rows);  
    } catch (error) {
        console.log(error)
    } 
};

module.exports = {
    sellerAuth,
    sellerSignup,
    sellerLogin,
    sellerProfile,
    sellersBooks,
    addNewBook,
    sellersOrders
};