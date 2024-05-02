import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Data", dataSchema)