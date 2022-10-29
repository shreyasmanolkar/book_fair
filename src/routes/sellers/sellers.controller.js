function sellerAuth(req, res){
    res.send("seller authorization");
};

function sellerSignup(req, res){
    res.send("seller sign up");
};

function sellerLogin(req, res){
    res.send("seller login");
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