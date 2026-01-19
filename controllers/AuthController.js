import { generateToken } from "../middlewares/AuthMiddleware.js";
import User from "../models/userModel.js";

const loginController = async(req,res)=>{
    console.log(req.body)
    const {email, password} = req.body;
    console.log(email,password)
    try{
    const user= await User.findOne({email:email})
    console.log(user)
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials (user not found)' });
    }
    const passCheck = await user.comparePassword(password);
    console.log(passCheck)
    if (!passCheck) {
        return res.status(401).json({ error: 'Invalid credentials (wrong password)' });
    }
    const payload = {
        user: user.id,
        role: user.role
    }

    const Token = generateToken(payload);
    res.status(201).json({success:true,token:Token, role: user.role})
    }catch(err){
        console.log(err)
    }
}

const signupController = async(req,res)=>{
    const data = req.body;
    try{
    const newUser= await User(data);
    const responce = await newUser.save();
    const payload = {
        user: responce.id,
        role: responce.role
    }
    const Token = generateToken(payload);
    res.status(201).json({success:true,token:Token})
    
    }catch(err){
        console.log(err)
    }
}
export {loginController, signupController}