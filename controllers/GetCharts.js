import Chart from "../models/ChartModel.js";

const GetCharts = async (req, res) => {
  try {
    const userId = req.userData.userData.user; 
    console.log(userId);
    
    const charts = await Chart.find({ userId:userId });
    res.status(200).json(charts);
  } catch (error) {
    console.log("Error while fetching charts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default GetCharts;