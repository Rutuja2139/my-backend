import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    uploadsNo:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

userSchema.pre('save', async function(next){
    const user = this; //current user whose info is going to be saved
    if(!user.isModified("password")){ return next();}
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
    }catch(err){
        console.log(err);
        return next(err);
    }
    
})

userSchema.methods.comparePassword = async function(candidatePass){
    try{
        const isMatch = await bcrypt.compare(candidatePass,this.password) 
        return isMatch;
    }catch(err){
        throw err;
    }
}

const User = mongoose.model('user',userSchema);
export default User;

