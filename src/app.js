const express = require('express');
const app = express();
const { users, ROLE } = require('./models/data');
const { authUser, authRole } = require('./auth/basicAuth');

const sellerRouter = require('./routes/sellers/sellers.router');
const buyerRouter = require('./routes/buyers/buyers.router');
const viewSellersRouter = require('./routes/viewSellers/viewSellers.router');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home page');
});

app.use(setUser);
app.use(authUser);

app.use('/seller', authRole(ROLE.SELLER), sellerRouter);
app.use('/buyer', authRole(ROLE.BUYER), buyerRouter);
app.use('/sellers', authRole(ROLE.BUYER), viewSellersRouter);

function setUser(req, res, next){
    const userId = req.body.userId; 
    if(userId){
        req.user = users.find(user => user.id === userId);
    };
    console.log(req.user);
    next();
};

module.exports = app;