const Book = require('../models/bookmodel')
const User = require('../models/usermodels')

let orderplaced = async(req,res)=>{
    try {
        const {id} = req.headers;
        const {order}=req.headers;  
        for(const orderData of order){
            const newOrder = new Order({
                user:id,
                book:orderData.id
               
            })
            const orderdatafromdb = await newOrder.save();
            await User.findByIdAndUpdate(id,{
                $push:{
                    order:orderdatafromdb._id
                }
            })
            await User.findByIdAndUpdate(orderData.id,{
                $push:{
                    order:orderdatafromdb._id
                }
            })
            return res.status(200).json({
                message:"order placed successfully",
                order:orderdatafromdb
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"something went wrong"
        })
        
    }
}

//get order of a particular user
let getorder = async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path:"order",   
            populate:{
                path:"book"
            }
        })
        const orderData = userData.order.reverse();
        res.status(200).json({
            message:"order fetched successfully",
            order:orderData
        })
    } catch (error) {
        res.status(500).json({
            message:"something went wrong"
        })

    }
}
//get all order
let getallorder = async(req,res)=>{
    try {
        const userData = await Order.find().populate({
            path:"book"
        }).populate({
            path:"user"
        })
        .sort({createdAt:-1})
        return res.status(200).json({
            message:"order fetched successfully",
            order:userData
        })
        
    } catch (error) {
        res.status(500).json({
            message:"something went wrong"
        })
    }
}

//update order
let updateorder = async(req,res)=>{
    try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id,{
            status:req.body.status
            
        })
        return res.status(200).json({
            message:"order updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"something went wrong"
        })
        
    }
}
module.exports = {
    orderplaced,
    getorder,
    getallorder,
    updateorder
}