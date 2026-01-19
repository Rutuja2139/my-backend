import mongoose from "mongoose";


const ChartSchema = new mongoose.Schema({
  ChartName: {
    type: String,
    required: true,
  },
  Xname: {
    type: String,
    required: true,
  },
  Yname: {
    type: String,
    required: true,
  },
  Xaxis: {
    type: [String],
    required: true,
  },
  Yaxis: {
    type: [Number],
    required: true,
  },
  Charttype: {
    type: String,
    enum: ["bar", "line", "pie", "scatter", "threescatter"],
    required: true,
  },
  time: {
    type: Date,
    default: Date.now
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Chart = mongoose.model("Chart", ChartSchema);

export default Chart;