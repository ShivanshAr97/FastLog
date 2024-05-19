import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Enter text value"],
    },
    passkey: {
      type: String,
    },
    text: {
      type: String,
      required: true,
      default: "Enter text and click save above to save the session.",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", userSchema);
