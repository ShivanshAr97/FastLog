import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import userRouter from "./routes/userRoutes.js";
import signUploadRoutes from "./routes/signUploadRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import textRouter from "./routes/textRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 3000;

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

const corsOptions ={
  origin:['https://fastlog.vercel.app','http://localhost:5173','https://login-final.vercel.app/'], 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.get("/",(req,res)=>{
    res.send("Running")
    return 
})


app.use("https://login-final.vercel.app/api/user", userRouter);
app.use("https://login-final.vercel.app/api/text", textRouter);

app.use("https://login-final.vercel.app/api/files", fileRoutes);
app.use("https://login-final.vercel.app/api/sign-upload", signUploadRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
