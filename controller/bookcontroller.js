const Book = require("../models/bookmodel");
const User = require("../models/usermodels")


const addBook = async(req,res)=>{
    try {

        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res.status(400).json({message:"you can not perform this task"})
        }

        const {url,title,desc,auther,price}=req.body;
        let errors =[]
        if(!url || typeof url !== 'string' || url.trim() === ''){

            errors.push("url is required")
        }
        if(!title || typeof title !== 'string' || title.trim() === ''){
            errors.push("title is required")
        }
        if(errors.length > 0){
            return res.status(400).json({message:errors})
        }
        const existbook = await Book.findOne({title})
        if(existbook){
            return res.status(400).json({message:"book already axists"})

        }

        const book = new Book ({
            url:url,
            title:title,
            desc:desc,
            price:price
        })
        await book.save()
        return res.status(200).json({message:"book add secessfully",data:book})
    } catch (error) {
        res.status(500).json({message:"internal server error",error:error.message})
    }
}


const updateBook = async (req,res)=>{
    try {
        const {bookid} =req.headers
        const book =await Book.findByIdAndUpdate(bookid,{
            url:req.url,
            title:req.title,
            price:req.price
        })
        if(!book){
            return res.status(404).json({message:"book not avilable"})
        }
        return res.status(200).json({message:"book update secessfuly",data:book})
    
        
    } catch (error) {
        res.status(500).json({message:"internal server error",error:error.message})
        
    }
}

const deleteBook = async(req,res)=>{
    try {
        const {bookid} = req.headers
        const book = await Book.findByIdAndDelete(bookid)
        if(!book){
            return res.status(404).json({message:"book not avialible"})
        }
        return res.status(200).json({message:"book deleted secessfully",data:book})

        
    } catch (error) {
        res.status(500).json({message:"internal server error",error:error.message})
    }
}
const getBooks = async (req,res)=>{
    try {
        const book = await Book.find({})
        res.status(200).json(book)
        
    } catch (error) {
        return res.status(500).json({message:"internal server error",error:error.message})
    }
}
const getBook = async (req,res)=>{
    try {
        const {id} = req.params; //check this line agin 
        const book = await Book.findById(id)
        if(!book){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(book)
        
    } catch (error) {
        res.status(500).json({message:"internal server error",error:error.message})
        
    }
}
const getfourBooks =async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt: -1}).limit(4)
        return res.status(200).json({message:"book retrived secessfully",data:books})
        
    } catch (error) {
        return res.status(500).json({message:"internal server error",error:error.message})
        
    }
}

module.exports= {

    addBook,
    updateBook,
    deleteBook,
    getBooks,
    getBook,
    getfourBooks
}