import Chart from "../models/ChartModel.js";


const deletecharts = async (req,res)=>{

    try {
        const chartId = req.params.id;
    await Chart.findByIdAndDelete(chartId);
    res.status(200).json({ message: "Chart deleted successfully" });
    } catch (error) {
        console.log("Error deleting charts:", error);
        res.status(500).json(error);
    }


}
export default deletecharts;