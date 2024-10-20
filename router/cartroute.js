const express =require('express')
const cartrouter = express.Router()

const {

    addtoCart,
    removetocart,
    getCart
}=require('../controller/cartcontroller')
const { checkAuth } = require('../auth/auth')
 cartrouter.post('/addtocart',checkAuth,addtoCart)
 cartrouter.delete('/deletetocart',checkAuth,removetocart)
 cartrouter.get('/carts',checkAuth,getCart)




module.exports = cartrouter