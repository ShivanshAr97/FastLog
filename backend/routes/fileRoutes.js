import express from "express";
import { createFile,getFile } from "../controllers/fileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect,createFile);
router.get("/", protect,getFile);

export default router;