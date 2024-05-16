import express from "express"
const router = express.Router()
import {deleteText, getText, setText, updateText} from "../controllers/textController.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/").get(protect,getText).post(protect,setText)
router.route("/:id").delete(protect,deleteText).put(protect,updateText)

export default router
