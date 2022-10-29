const { users } = require('../models/data');  

function setUser(req, res, next){
    const userId = req.body.userId; 
    if(userId){
        req.user = users.find(user => user.id === userId);
    };
    console.log(req.user);
    next();
};

module.exports = {
    setUser
};