import expressAsyncHandler from "express-async-handler";
import Video from "../models/videoModel.js";

export const createFile = async (req, res, next) => {
  const { fileUrl,fileName } = req.body;

  if (!fileUrl) {
    res.status(400);
    return next(new Error("FileUrl not found"));
  }

  try {
    const file = await Video.create({
      fileUrl,fileName,user:req.user.id
    });

    res.status(201).json({
      success: true,
      file,
    });
    return
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
    return 
  }
};

export const getFile = expressAsyncHandler(async (req, res) => {
  const texts = await Video.find({user:req.user.id});
  res.status(200).json(texts);
  return
});