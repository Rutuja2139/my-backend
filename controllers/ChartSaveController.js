import Chart from "../models/ChartModel.js";


const savecharts = async (req,res)=>{

    try {
        const data = req.body;        
        const newdata = {...data,userId:req.userData.userData.user}
        const newChart = new Chart(newdata);
        const response = await newChart.save();
        console.log(response)
        res.status(200).json(response);
    } catch (error) {
        console.log("Error saving data:", error);
        res.status(500).json(error);
    }


}
export default savecharts;