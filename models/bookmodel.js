const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    url:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    }, 
     auther:{
        type:String,
        // require:true
    },
    desc:{
        type:String,
        // require:true
    },
    price:{
        type:Number,
        // require:true
    },
    language:{
        type:String,
        // require:true
    },
    

},
{
    timestamps:true
})
const Book = mongoose.model("books",bookSchema)
module.exports = Book;