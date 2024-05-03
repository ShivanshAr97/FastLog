import User from "../models/User.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"

const getUsers = asyncHandler(async (req, res) => {
    const user = await User.find().select('-passkey').lean()
    if (!user?.length) {
        return res.status(400).json({ message: "No user found" })
    }
    res.json(user)
})

const addUser = asyncHandler(async (req, res) => {
    const { username, userid, passkey } = req.body
    if (!username || !userid || !passkey) return res.status(400).json({ message: "Fields required" })
    const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: "User already exists" })
    }
    const hashedPass = await bcrypt.hash(passkey, 10)
    const userObj = { username, userid, passkey: hashedPass }
    const user2 = await User.create(userObj)
    if (user2) {
        return res.status(201).json({ message: `${user2.username} saved` })
    }
    else {
        return res.status(400).json({ message: 'Invalid user data received' })
    }
})


const updateUser = asyncHandler(async (req, res) => {
    const { id, username, userid, passkey } = req.body
    if (!id || !username || !userid || !passkey) {
        return res.status(400).json({ message: "All fields required" })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.userid = userid
    if (passkey) {
        user.passkey = await bcrypt.hash(passkey, 10)
    }
    const updatedUser = await user.save()
    res.json({ message: `${updatedUser.username} updated successfully` })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: "Cannot be deleted without id" })
    }
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()
    res.json({ message: `Username ${user.username} with ID ${user.id} deleted` })
})

export default { getUsers, addUser, updateUser, deleteUser }