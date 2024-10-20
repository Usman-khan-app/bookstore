const express = require('express')

const orderrouter = express.Router();
 const {
    orderplaced,
    getorder,
    getallorder,
    updateorder
 } = require('../controller/ordercontroller');
const { checkAuth } = require('../auth/auth');

orderrouter.post('/addorder',checkAuth,orderplaced)
orderrouter.get('/getorder',checkAuth,getorder)
orderrouter.get('/getorders',checkAuth,getallorder)
orderrouter.put('/updateorder/:id',checkAuth,updateorder)

 module.exports = orderrouter