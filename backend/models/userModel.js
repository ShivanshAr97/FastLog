import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'Enter text value']
    },
    passkey:{
        type:String
    }
},{
    timestamps:true
})
export default mongoose.model("User",userSchema)