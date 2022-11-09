const express = require('express');
const sellersRouter = express.Router();

const { authSeller, authUserDashboard } = require('../../auth/basicAuth');
const { setSeller } = require('../../auth/setUser');

const {    
    sellerAuth,
    sellerSignup,
    sellerSignupDisplay,
    sellerLogin,
    sellerLoginDisplay,
    sellerProfile,
    sellersBooks,
    addNewBook,
    addNewBookDisplay,
    addNewShop,
    addNewShopPost,
    sellersOrders } = require('./sellers.controller');
   
sellersRouter.use(express.json());

sellersRouter.get('/', sellerAuth);

sellersRouter.get('/new', sellerSignupDisplay);
sellersRouter.post('/new', sellerSignup);

sellersRouter.get('/login', sellerLoginDisplay);
sellersRouter.post('/login', sellerLogin);

sellersRouter.use(setSeller);
sellersRouter.use(authUserDashboard);

// sellersRouter.get('/:sellerId', authSeller, sellerProfile);

// sellersRouter.get('/:sellerId/books', authSeller, sellersBooks);
// sellersRouter.get('/:sellerId/books/new', authSeller, addNewBook);

// sellersRouter.get('/:sellerId/orders', authSeller, sellersOrders);

sellersRouter.get('/:sellerId', authSeller, sellerProfile);

sellersRouter.get('/:sellerId/newshop', authSeller, addNewShop);
sellersRouter.post('/:sellerId/newshop', authSeller, addNewShopPost);

sellersRouter.get('/:sellerId/books', authSeller, sellersBooks);
sellersRouter.get('/:sellerId/books/new', authSeller, addNewBookDisplay);
sellersRouter.post('/:sellerId/books/new', authSeller, addNewBook);

sellersRouter.get('/:sellerId/orders', authSeller, sellersOrders);

// sellersRouter.get('/:sellerId', sellerProfile);

// sellersRouter.get('/:sellerId/newshop', addNewShop);
// sellersRouter.post('/:sellerId/newshop', addNewShopPost);

// sellersRouter.get('/:sellerId/books', sellersBooks);
// sellersRouter.get('/:sellerId/books/new', addNewBookDisplay);
// sellersRouter.post('/:sellerId/books/new', addNewBook);

// sellersRouter.get('/:sellerId/orders', sellersOrders);

module.exports = sellersRouter;