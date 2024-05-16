import mongoose from "mongoose";
const contentSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    text:{
        type:String
    }
},{
    timestamps:true
})
export default mongoose.model("Content",contentSchema)