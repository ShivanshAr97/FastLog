import express from "express"
import userControllers from "../controllers/userControllers"

const router = express.Router()

router.route('/').get(userControllers.getUsers)

export default route