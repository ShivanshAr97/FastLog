import express from "express"
import userControllers from "../controllers/userControllers.js"

const router = express.Router()

router.route('/')
    .get(userControllers.getUsers)
    .post(userControllers.addUser)
    .put(userControllers.updateUser)
    .delete(userControllers.deleteUser)

export default router