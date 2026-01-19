import File from '../models/fileModel.js';

const historyController = async (req, res) => {
  try {
    const userId = req.userData.userData.user; 
    console.log(userId);
    
    const files = await File.find({ userId:userId });
    res.status(200).json(files);
  } catch (error) {
    console.log("Error while fetching charts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default historyController;