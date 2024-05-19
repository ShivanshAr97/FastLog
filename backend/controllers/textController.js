import asyncHandler from "express-async-handler";
import contentModel from "../models/contentModel.js";

const getText = asyncHandler(async (req, res) => {
  const texts = await contentModel.find({user:req.user.id});
  res.status(200).json(texts);
});

const setText = asyncHandler(async (req, res) => {

  if (!req.body.text) {
    res.status(400);
    throw new Error("add text");
  }

  const text = await contentModel.create({ text: req.body.text,user:req.user.id });
  console.log(text);
  
  res.status(200).json(text);
});

const updateText = asyncHandler(async (req, res) => {

  const text = await contentModel.findById(req.params.id);
  
  if (!text) {
    res.status(400);
    throw new Error("Text not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (text.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedText = await contentModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedText);
});

const deleteText = asyncHandler(async (req, res) => {

  const text = await contentModel.findById(req.params.id);

  if (!text) {
    res.status(400);
    throw new Error("text not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (text.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await text.deleteOne();
  res.status(200).json(req.params.id);
});

export { getText, setText, updateText, deleteText };
