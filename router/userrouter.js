const express =require('express')
const {checkAuth} = require('../auth/auth')

const {
    signUp,
    signIn,
    deleteUser,
    getUsers,
    getUser,
    updateUser
 } =require('../controller/usercontroller')
 const userrouter =express.Router()

userrouter.post('/signup',signUp)
userrouter.post('/login',signIn)
userrouter.delete('/deleteuser', checkAuth, deleteUser)
userrouter.get('/',getUsers)
userrouter.get('/getuser' ,checkAuth,getUser)
userrouter.put('/updateuser',checkAuth,updateUser)

module.exports = userrouter
