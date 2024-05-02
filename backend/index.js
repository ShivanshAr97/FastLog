import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import errorHandler from "./middleware/errorHandler.js"
import cors from "cors"
import corsOptions from "./config/corsOptions.js"
import dotenv from "dotenv"
import dbConn from "./config/dbConn.js"
import route from "./routes/userRouter.js"

dotenv.config()

dbConn()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser)

app.use("/", (req, res) => {
    res.send("Hello")
})

app.use("/login", route)

app.use(errorHandler)
mongoose.connection.once('open', () => {
    console.log("connected to mongo");
    app.listen(PORT, () => console.log(`Server running port ${PORT}`))
})
mongoose.connection.once('error', () => {
    console.log("error connecting to mongo");
})