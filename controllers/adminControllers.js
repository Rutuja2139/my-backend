import File from "../models/fileModel.js";
import User from "../models/userModel.js";
import Chart from "../models/ChartModel.js";

const adminManagementController = async (req,res)=>{
        try {
            // Fetch statistics
            const totalUsers = await User.countDocuments();
            const totalUploads = await File.countDocuments();
            const chartUsage = await Chart.countDocuments();
            const user = await User.findById(req.userData.userData.user).select('name')

            res.json({
              totalUsers:totalUsers,
              totalUploads:totalUploads,
              chartUsage:chartUsage,
              name: user.name
            });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        
}

const adminInfoManagement = async(req,res)=>{
    try{
        const allUsers = await User.find()
        res.json(allUsers)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

const userDeleteController = async(req,res)=>{
  try{
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id)
    res.json(user)
  }catch(err){
    res.status(500).json({error:err.message})
  }
}

const makeAdminController = async(req,res)=>{
  try{
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id,{role:'admin'})
    res.json(user)
    console.log("cong!! you are the admin")
  }catch(err){
    res.status(500).json({error:err.message})
  }
}

export {adminManagementController,adminInfoManagement,userDeleteController,makeAdminController}