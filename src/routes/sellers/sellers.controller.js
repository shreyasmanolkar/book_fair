const pool = require('../../models/database');
const authId = require('../../auth/authId');

function sellerAuth(req, res){
    res.render('seller-sign-log',{
        title: 'Seller Authentication',
        layout: 'dashboard.handlebars'
    });
};

async function sellerSignupDisplay(req, res){
    res.render('seller-sign-up',{
        title: 'Seller Sign Up',
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
                title: 'Seller Sign Up',
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
        title: 'Seller Log In',
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
                title: 'Seller Log In',
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
                    title: 'Seller Log In',
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
            res.redirect('/seller/login');
        } else {
            let data = {
                sellerDetails: sellerDetails.rows
            }

            res.render('sellerDashboard', {
                data,
                title: 'Seller Dashboard',
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
            `SELECT b.name, b.image_url, SUBSTRING( b.description FOR 300) , b.price, s.full_name AS "seller_name", s.seller_id, b.book_id
            FROM "public"."books" AS "b"
            JOIN "public"."sellers" AS "s"
            ON b.seller_id = s.seller_id
            WHERE b.seller_id = $1`,
            [sellerId]
        );
            
        if(!sellerBooks.rows[0]){
            res.render('dashboardBooksNotFound', {
                sellerIdInfo: sellerIdInfo.rows,
                title: 'Dashboard Book Not Found',
                layout: 'dashboard.handlebars'
            });
        } else {
            let data = {
                sellerIdInfo: sellerIdInfo.rows,
                sellerBooks: sellerBooks.rows
            }

            res.render('dashboardBooks', {
                data,
                title: 'Dashboard Books',
                layout: 'dashboard.handlebars'
            });
        }

    } catch (error) {
        console.log(error)
    }
};

async function sellersBook(req, res){
    try{
        const bookId = Number(req.params.bookId);
        const sellerId = Number(req.params.sellerId);

        const bookInfo = await pool.query(
            `SELECT b.name, b.image_url, s.full_name, b.price, b.description, b.seller_id, b.book_id
            FROM "public"."books" AS "b"
            JOIN "public"."sellers" AS "s" 
            ON s.seller_id = b.seller_id
            WHERE b.book_id = $1
            AND s.seller_id =  $2`,
            [bookId, sellerId]
        );

        let data = {
            bookInfo: bookInfo.rows
        };

        res.render('sellerBookDetail', {
            data,
            title: 'Seller Book Detail',
            layout: 'dashboard.handlebars'
        });
        
    } catch(err){
        console.log(err);
    }
};

async function addNewBookDisplay(req, res){
    const sellerId = Number(req.params.sellerId);

    res.render('addNewBookDisplay', {
        sellerId,
        title: 'New Book',
        layout: 'dashboard.handlebars'
    });
}

async function addNewBook(req, res){

    try {
        let { name, stock, img_url, price, description, seller_id } = req.body;
        let errors = [];

        // validate fields
        if(!name){
            errors.push({ text: 'Please add name of the book' })
        }

        if(!stock){
            errors.push({ text: 'Please add stock of the book' })
        }
        
        if(!img_url){
            errors.push({ text: 'Please add image url of the book' })
        }
        
        if(!price){
            errors.push({ text: 'Please add price of the book' })
        }
        
        if(!description){
            errors.push({ text: 'Please add detail description of the book' })
        }

        if(!seller_id){
            errors.push({ text: 'Please add seller Id' })
        }

        // check for errors

        if(errors.length > 0){        
            console.log(errors);
            res.render('addNewBookDisplay', {
                errors,
                name,
                stock,
                img_url,
                price,
                seller_id,
                description,
                title: 'New Book',
                layout: 'dashboard.handlebars'
            });
        } else {
            name = name.toLowerCase();

            // if book already exist 

            const book = await pool.query(
                `SELECT * 
                FROM "public"."books"
                WHERE "name" ILIKE $1
                AND seller_id = $2`,
                [name, seller_id]
            );

            // create new book

            if(!book.rows.description){

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
                    [name, stock, img_url, seller_id, price, description]
                );

                res.redirect('/books/')

            } else {
                errors.push({text: `Try again later!!`})

                console.log(errors);

                res.render('addNewBookDisplay', {
                    errors,
                    name,
                    stock,
                    img_url,
                    price,
                    seller_id,
                    description,
                    title: 'New Book',
                    layout: 'dashboard.handlebars'
                });
            }
        }

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
        
        const sellersOrders = await pool.query(
            `select 
            o.order_id, 
            o.book_id, 
            o.cart_id, 
            o.quantity,
            b.full_name AS "buyer_name",
            b.address AS "buyer_address",
            bo.name,
            bo.image_url,
            bo.price
            FROM "public"."orders" AS "o"
            JOIN "public"."carts" AS "c" 
            ON c.cart_id = o.cart_id
            JOIN "public"."buyers" AS "b"
            ON b.buyer_id = c.buyer_id
            JOIN "public"."books" AS "bo"
            ON bo.book_id = o.book_id
            WHERE bo.seller_id = $1`,
            [sellerId]
        )
    
        if(!sellersOrders.rows[0]){
            res.render('dashboardOrdersNotFound', {
                sellerIdInfo: sellerIdInfo.rows,
                title: 'Orders',
                layout: 'dashboard.handlebars'
            });
        } else {

            let data = {
                sellerIdInfo: sellerIdInfo.rows,
                sellersOrders: sellersOrders.rows
            };

            res.render('dashboardOrders', {
                data,
                title: 'Orders',
                layout: 'dashboard.handlebars'
            });
        }
    } catch (error) {
        console.log(error)
    } 
};

async function sellerDelete(req, res){
    const sellerId = authId[authId.length - 1];
    let { bookId } = req.body;

    await pool.query(
        `DELETE FROM "public"."books"
        WHERE seller_id = $1 
        AND book_id = $2`,
        [sellerId, bookId]
    );

    res.redirect(`/seller/${sellerId}/`)

};

module.exports = {
    sellerAuth,
    sellerSignupDisplay,
    sellerSignup,
    sellerLogin,
    sellerLoginDisplay,
    sellerProfile,
    sellersBooks,
    sellersBook,
    addNewBook,
    sellersOrders,
    addNewBookDisplay,
    sellerDelete
};