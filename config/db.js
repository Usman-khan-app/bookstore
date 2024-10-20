const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config()

function ConnectDb(){
    mongoose.connect(process.env.MONGU_URL).then(()=>{
        console.log("database is connected")
    }).catch((err)=>{
        console.log("connection failed",err.message)
    })
}

module.exports = ConnectDb;