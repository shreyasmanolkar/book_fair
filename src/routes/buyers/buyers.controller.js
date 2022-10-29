function buyerAuth(req, res){
    res.send('buyer authorization')
};

function buyerSignup(req, res){
    res.send("buyer sign up");
};

function buyerLogin(req, res){
    res.send("buyer login");
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