
const userCheckMiddleware = (req, res, next)=>{
    console.log(req.userData)
     if(req.userData.userData.role=='user'){
        next();
     }else{
    res.status(403).json({message:'You are not authorized to access this page'})
     }
}

export default userCheckMiddleware