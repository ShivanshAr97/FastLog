import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    passkey: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("User", userSchema)