import File from '../models/fileModel.js';

const deleteHistoryController = async (req, res) => {
  try {
    const fileId = req.params.id;
    const responce = await File.findByIdAndDelete(fileId);
    console.log(responce);
    res.status(200).json({ message: "file deleted successfully" });
  } catch (error) {
    console.log("Error deleting files:", error);
        res.status(500).json(error);
  }
};

export default deleteHistoryController;