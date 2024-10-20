const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
user:{
    type:mongoose.Types.ObjectId,ref:"users"
},
book:{
    type:mongoose.Types.ObjectId,ref:"books"

},
status:{
    type:String,
    default:"order plced",
    enum:["order placed","order cancel , order deliver,out of order"]
}

})

const Order = mongoose.model("orders",orderSchema)

module.exports = Order