const { users, ROLE } = require('../../models/data');

function buyerAuth(req, res){
    res.send('buyer authorization')
};

async function buyerSignup(req, res){
    console.log(req.body);
    try{
        const user = {
            id: Number(new Date().getTime()),
            name: req.body.name,
            role: ROLE.BUYER
        };

        await users.push(user);
        res.send(users);
    } catch(err){
        res.json({status: 'error', error: 'Duplicate Email'});
    }
};

async function buyerLogin(req, res){
    const name = req.body.name;
    const userStats = users.find(user => user.name.toLowerCase() === name.toLowerCase());
    if(userStats){
        req.user = userStats; 
        res.json({"status": req.user});
    }
    res.json({status: 'Invalid User Name'});
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