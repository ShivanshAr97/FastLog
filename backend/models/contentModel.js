import mongoose from "mongoose";
const contentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required:true,
      default:"Enter text and click save above to save the session."
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Content", contentSchema);
