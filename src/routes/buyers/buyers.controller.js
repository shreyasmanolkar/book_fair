const { users, ROLE } = require('../../models/data');
const pool = require('../../models/database');

function buyerAuth(req, res){
    res.send('buyer authorization')
};

async function buyerSignup(req, res){
    try{
        const full_name = req.body.full_name.toLowerCase();
        const email = req.body.email.toLowerCase();

        await pool.query(
            `INSERT INTO buyers (
                full_name,
                email
            ) VALUES (
                $1,
                $2
            )`,
            [full_name, email]
        );

        let buyer = await pool.query(
            `SELECT buyer_id 
            FROM "public"."buyers" 
            WHERE full_name = $1`,
            [full_name]
        );

        const buyerId = buyer.rows.map(buy => buy.buyer_id);

        console.log(buyerId[0]);

        pool.query(
            `INSERT INTO carts (
                buyer_id
            ) VALUES (
                $1
            )`,
            [buyerId[0]]
        );

        res.json("Buyer Signed up");
    } catch(err){
        console.log(err);
    }
};

async function buyerLogin(req, res){
    try{
        const full_name = req.body.full_name.toLowerCase();
        const email = req.body.email.toLowerCase();

        console.log(full_name);
        console.log(email);

        const user = await pool.query(
            `SELECT *
            FROM "public"."buyers"
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

async function buyerProfile(req, res){
    const buyerId = Number(req.params.buyerId);

    const buyerDetails = await pool.query(
        `SELECT b.buyer_id, b.full_name, b.email, c.cart_id  
        FROM "public"."buyers" AS "b"
        JOIN "public"."carts" AS "c" 
        ON b.buyer_id = c.buyer_id
        WHERE b.buyer_id = $1;`,
        [buyerId]
    );

    res.json(buyerDetails.rows);
};

function buyerCart(req, res){
    const buyerId = Number(req.params.buyerId);
    res.send(`This is buyer id ${buyerId} carts.`);
};

module.exports = {
    buyerAuth,
    buyerSignup,
    buyerLogin,
    buyerProfile,
    buyerCart
};