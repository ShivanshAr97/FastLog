import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import contentModel from "../models/contentModel.js";

const registerUser = expressAsyncHandler(async (req, res) => {
  const { userName, passkey } = req.body;

  if (!userName) {
    res.status(400);
    throw new Error("Enter userName");
  }

  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(400);
    throw new Error("userName already registered. enter the passkey to access");
  }

  const user = await User.create({
    userName,
    passkey,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      passkey: user.passkey,
      token: generateToken(user._id),
    });
    return
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { userName, passkey } = req.body;

  const user = await User.findOne({ userName });

  if (user && passkey == user.passkey) {
    res.json({
      _id: user.id,
      userName: user.userName,
      passkey: user.passkey,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid login data");
  }
});

const about = expressAsyncHandler(async (req, res) => {
  const { _id, userName, passkey } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    userName,
    passkey,
  });
  return
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, about };
