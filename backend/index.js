import express from "express"
import dotenv from "dotenv"
dotenv.config()
import userRouter from "./routes/userRoutes.js"
import signUploadRoutes from "./routes/signUploadRoutes.js"
import fileRoutes from "./routes/fileRoutes.js"
import textRouter from "./routes/textRoutes.js"
import {errorHandler} from "./middleware/errorMiddleware.js"
import connectDB from './config/db.js'

const port=3000

const app=express()

connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(errorHandler)

app.get("/",(req,res)=>{
    res.send("Running")
})

app.use('/api/user',userRouter)
app.use('/api/text',textRouter)

app.use("/api/files", fileRoutes);
app.use("/api/sign-upload", signUploadRoutes);

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})