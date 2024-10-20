const express =require('express')

const {
    addBook,
    updateBook,
    deleteBook,
    getBooks,
    getBook,
    getfourBooks
} = require('../controller/bookcontroller')
const { checkAuth } = require('../auth/auth')
const bookrouter = express.Router()


bookrouter.post('/addbook',checkAuth,addBook)
bookrouter.put('/updatebook',checkAuth,updateBook)
bookrouter.delete('/deletebook',checkAuth,deleteBook)
bookrouter.get('/getbooks',getBooks)
bookrouter.get('/getbook/:id',getBook)
bookrouter.get('/getfourbook',getfourBooks)





module.exports = bookrouter