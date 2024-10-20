const { checkAuth } = require('../auth/auth')
const {
    addToFav,
    deleteFromFav,
    getFavBooks
} = require('../controller/favcontroller')
const express = require('express')
  const favrouter = express.Router()



  favrouter.put('/addtofav',checkAuth,addToFav)
  favrouter.delete('/delete',checkAuth,deleteFromFav)
  favrouter.get("/getfav",checkAuth,getFavBooks)


  module.exports = favrouter

