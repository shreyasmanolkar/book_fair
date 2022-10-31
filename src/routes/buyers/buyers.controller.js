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

function buyerProfile(req, res){
    const buyerId = Number(req.params.buyerId);
    res.send(`Buyer id is ${buyerId}`);
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