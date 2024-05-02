import User from "../models/User.js"
import Data from "../models/Data.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"

const getUsers = asyncHandler(async () => {
    const user = await User.find().select('-password').lean()
    if (!user) {
        return res.status(400).json({ message: "No user found" })
    }
    res.json(user)
})

const addUser = asyncHandler(async () => {
    const user = { username, userid, passkey }
    if (!username || !userid || !passkey) res.status(400).json({ message: "Fields required" })
    const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: "User already exists" })
    }
    const hashedPass = await bcrypt.hash(passkey, 10)
    const userObj = { username, userid, passkey: hashedPass }
    const user2 = await User.create(userObj)
    if (user2) {
        res.status(201).json({ message: `${user2.username} saved` })
    }
    else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})


const updateUser = asyncHandler(async () => {

})

const deleteUser = asyncHandler(async () => {

})

export default { getUsers, addUser, updateUser, deleteUser }