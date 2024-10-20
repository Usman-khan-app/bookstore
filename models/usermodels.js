const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        require:true
    },
    email :{
        type:String,
        require:true
    },
    password :{
        type:String,
        require:true
    },
    address :{
        type:String,
        
    },
    phone :{
        type:String,
    
    },
    role :{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    fav:[{type:mongoose.Types.ObjectId,ref:"books"}],
    cart:[{type:mongoose.Types.ObjectId,ref:"books"}],
    order:[{type:mongoose.Types.ObjectId,ref:"order"}]


},{
    timestamps:true
})
const User = mongoose.model("users",userSchema)

module.exports = User