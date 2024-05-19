import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Video", videoSchema);
