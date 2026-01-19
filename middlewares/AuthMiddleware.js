import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (userData)=>{
    const token = jwt.sign({userData},process.env.JWT_SECRET);
    return token;
}

const JWTAuthMiddleware = (req,res,next)=>{
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).send({message:"Unauthorized, please login with correct credentials or create an account"});
    const token = authorization.split(" ")[1];
    if(!token){
        return res.status(401).send({message:"Unauthorized, please login with correct credentials or create an account"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    }catch(err){
        return res.status(401).send({message:"Unauthorized, please login with correct credentials or create an account"});
    }
}

export {generateToken, JWTAuthMiddleware}