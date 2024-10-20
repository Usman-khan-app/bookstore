const User = require("../models/usermodels");


const addToFav = async (req,res)=>{
    try {
        const {bookid,id}=req.headers;
        if(!bookid || !id){
            return res.status(400).json({message:"book id and user id are required"})
        }
        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const favBooks = user.fav.includes(bookid)
        if(favBooks){
           return res.status(400).json({message:"book is alredy in fav"})
        }
        await User.findByIdAndUpdate(id,{
            $push:{  fav:bookid  }
        })
        return res.status(200).json({message:"book is add to fav"})
        
    } catch (error) {
        res.status(500).json({message:"internal server error",error:error.message})
    }
}


const deleteFromFav= async (req,res)=>{
    try {

        const {bookid,id} =req.headers;
        if(!bookid || !id){
            return res.status(400).json({message:"book id and user id is required"})
        }
        const user = await User.findById(id)

        if(!user){
            return res.status(400).json({message:"user not found"})
        }
         
        const favBook = user.fav.includes(bookid)
        if(favBook){
            await User.findByIdAndUpdate(id,{
                $pull:{fav:bookid}
            })
        return res.status(200).json({message:"book deleted from fav"})

        }else{
            return res.status(400).json({message:"book is not in fav"})
        }
        
    } catch (error) {
        res.status(500).json({mssage:"internal server error",error:error.message})
    }
}

const getFavBooks = async (req,res)=>{
    try {
        const {id} =req.headers;
        const user = await User.findById(id).populate('fav')

        const favBook = user.fav
        return res.status(200).json({favBook})
        
    } catch (error) {
        res.status(500).json({message:"internal server error ",error:error.message})
    }
}
module.exports ={

 addToFav,
 deleteFromFav,
 getFavBooks
}