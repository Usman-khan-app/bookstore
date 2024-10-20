const User = require('../models/usermodels')

//add to cart
const addtoCart = async (req,res)=>{
    try {
        const {bookid, id}= req.headers;
        const userData = await User.findById(id)
        const isbookcart = userData.cart.includes(bookid)
        if(isbookcart){
            return res.status(400).json({message:"book already in cart"})
        }
        await User.findByIdAndUpdate(id,{
            $push:{cart:bookid}
        })
        return res.status(200).json({message:"book added to cart"})

        
    } catch (error) {
        res.status(400).json({message:"internal",error:error.message})
        
    }
}
//remove from cart
let removetocart = async (req,res)=>{
    try {
        const {bookid}= req.headers;
        const {id}= req.headers;
        await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid}
        })
        return res.status(200).json({message:"book removed from cart"})
        
    } catch (error) {
        res.status(400).json({message:"internal",error:error.message})
        
    }
}

const getCart= async(req,res)=>{
    try {
      const {id}= req.headers;
      const userData = await User.findById(id).populate('cart')
      const cart = userData.cart.reverse()
      return res.status(200).json({message:"cart",cart})
    
    } catch (error) {
        res.status(400).json({message:"internal",error:error.message})
        
    }

}
module.exports = {
    addtoCart,
    removetocart,
    getCart
}