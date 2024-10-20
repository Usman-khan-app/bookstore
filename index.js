const express = require('express')
const dotenv = require('dotenv')
const ConnectDb =require("./config/db")
const userrouter = require('./router/userrouter')
const bookrouter = require('./router/bookrouter')
const favrouter = require('./router/favrouter')
const orderrouter = require('./router/orderrouter')
const cartrouter = require('./router/cartroute')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/user',userrouter)
app.use ('/book',bookrouter)
app.use('/fav',favrouter)
app.use('/order',orderrouter)
app.use('/cart',cartrouter)

dotenv.config()
ConnectDb()




port = process.env.PORT || 1000
host = process.env.HOST || "localhost"
app.listen(port,host,()=>{
    console.log(`this app is runing on http://${host}:${port}`)
})
