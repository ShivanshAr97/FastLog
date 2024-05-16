import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Video", videoSchema);