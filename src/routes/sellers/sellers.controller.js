const { users, ROLE } = require('../../models/data');

function sellerAuth(req, res){
    res.send("seller authorization");
};

async function sellerSignup(req, res){
    console.log(req.body);
    try{
        const user = {
            id: Number(new Date().getTime()),
            name: req.body.name,
            role: ROLE.SELLER
        };

        await users.push(user);
        res.send(users);
    } catch(err){
        res.json({status: 'error', error: 'Duplicate Email'});
    }
};

function sellerLogin(req, res){
    const name = req.body.name;
    const userStats = users.find(user => user.name.toLowerCase() === name.toLowerCase());
    if(userStats){
        req.user = userStats; 
        res.json({"status": req.user});
    }
    res.json({status: 'Invalid User Name'});
};

function sellerProfile(req, res){
    const sellerId = Number(req.params.sellerId);
    res.send(`seller id is ${sellerId}`);
};

function sellersBooks(req, res){
    const sellerId = Number(req.params.sellerId);
    res.send(`All books of seller ${sellerId}`);
};

function addNewBook(req, res){
    const sellerId = Number(req.params.sellerId);
    res.send(`Added New book of seller ${sellerId}`);
};

function sellersOrders(req, res){
    const sellerId = Number(req.params.sellerId);
    res.send(`All Orders of seller ${sellerId}`);
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