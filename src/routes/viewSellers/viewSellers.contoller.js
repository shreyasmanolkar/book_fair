function allSellers(req, res){
    res.send('view all sellers');
};

function viewSellerProfile(req, res){  
    const sellerId = Number(req.params.sellerId); 
    res.send(`view seller ${sellerId} profile`);
};

function viewSellerBooks(req, res){  
    const sellerId = Number(req.params.sellerId); 
    res.send(`view seller id ${sellerId} all books `);
};

module.exports = {
    allSellers,
    viewSellerProfile,
    viewSellerBooks
};