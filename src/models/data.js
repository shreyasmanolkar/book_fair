const ROLE = {
    BUYER: 'buyer',
    SELLER: 'seller'
};

const users = [
    {id: 1, name: 'Omkar', role: ROLE.BUYER},
    {id: 2, name: 'Shreyas', role: ROLE.BUYER},
    {id: 3, name: 'Shubham', role: ROLE.BUYER},
    {id: 4, name: 'Sahil', role: ROLE.BUYER},
    {id: 5, name: 'Ajinkya', role: ROLE.SELLER},
    {id: 6, name: 'Saurabh', role: ROLE.BUYER}
];

module.exports = { 
    ROLE,
    users
};