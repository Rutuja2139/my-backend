const adminCheckMiddleware = (req, res, next)=>{
    console.log(req.userData)
     if(req.userData.userData.role=='admin'){
        next();
     }else{
      console.log("not authorised")
    res.status(403).json({message:'You are not authorized to access this page'})
     }
}

export default adminCheckMiddleware;