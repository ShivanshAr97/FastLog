import express from "express"
import cookieParser from "cookie-parser"
import errorHandler from "./middleware/errorHandler.js"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(cookieParser)

app.use("/", (req, res) => {
    res.send("Hello")
})

app.use(errorHandler
)
app.listen(PORT, () => console.log(`Server running port ${PORT}`))