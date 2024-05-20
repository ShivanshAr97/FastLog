import express from "express"
const router = express.Router()
import {getText, updateText} from "../controllers/textController.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/").get(protect,getText).put(protect,updateText)

export default router
