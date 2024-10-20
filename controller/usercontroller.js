const User = require("../models/usermodels");
const mongoose = require('mongoose')
const bcrypt =require('bcrypt')
const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")
 dotenv.config()


const signUp = async(req,res)=>{
    try {
        const {username,email,password,address,phone,role}=req.body;
        const errors =[]
        if(!username || typeof username !== 'string' || username.length < 4 || username.trim() === ''){
            errors.push("username is required")
        }
        if(!email ||typeof email !=="string" || email.trim()=== ''){
            errors.push("email is required")
        }
        if(!password || typeof password !== 'string' || password.length <6 || password.trim()===''){
            errors.push('password is required')
        }
        if(errors.length > 0){
            return res.status(400).json({message:errors})
        }
        const existuser = await User.findOne({ username})
        if(existuser){
            return res.status(400).json({message:"user is already exist"})
        }
        const existemail =await User.findOne({email})
        if(existemail){
            return res.status(400).json({message:"email is alredy exists"})
        }
        const hashpassword = await bcrypt.hash(password,10)
const user = new User({
    username : username,
    email:email,
    password:hashpassword,
    phone:phone,
    address:address,
    role:role
})
await user.save()
return res.status(200).json({message:"signup secessfully",data:user})
        
    } catch (error) {
        res.status(500).json({message:"internal server error",error:error.message})
        
    }
}



const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        let errors = [];

        // Input validation
        if (!username) {
            errors.push("Username is required");
        }
        if (!password) {
            errors.push("Password is required");
        }
        if (errors.length > 0) {
            return res.status(400).json({ message: errors });
        }

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT
        const payload = {
            _id: user.id,
            email: user.email,
            role: user.role  // Ensure the role is included in the payload
        };
        const options = {
            expiresIn: "30d"
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        // Respond with success
        return res.status(200).json({
            message: "Signed in successfully",
            data: {
                token: token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role  // Include the role in the response
                }
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};




const deleteUser = async (req,res)=>{
    try {
        const {id} =req.headers;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"invalid id"})
        }
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json({message:"user deleted",data:user})
        
    } catch (error) {
        return res.status(500).json({message:"internal server error",error:error.message})
        
    }
}

const getUsers = async (req,res)=>{
    try {
        const user = await User.find({})
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({message:"internal server error",error:error.message})
    }
}

const getUser = async(req,res)=>{
    try {
        const {id} = req.headers;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"invalid id"})
        }
        const user = await User.findById(id).select('-password')
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:"internal server error",error:error.message})
        
    }
}
const updateUser = async(req,res)=>{
    try {

        const {id} = req.headers
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"id invalid"})
        }
        const {username,email,address}=req.body;
        if(email){
            return res.status(200).json({message:"you can not change eamil"})
        }
        const user =  await User.findByIdAndUpdate(id,{
            username,address
        },{
            new:true
        })
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json({message:"user updated",data:user})
        
    } catch (error) {
        res.status(500).json({message:"internal server error",error:error.message})
        
    }
}
module.exports ={
    signUp,
    signIn,
    deleteUser,
    getUsers,
    getUser,
    updateUser
}