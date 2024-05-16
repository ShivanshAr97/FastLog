import Video from "../models/videoSchema.js";

export const createVideo = async (req, res, next) => {
  const { fileUrl } = req.body;

  if (!fileUrl) {
    res.status(400);
    return next(new Error("FileUrl not found"));
  }

  try {
    const file = await Video.create({
      fileUrl,
    });

    res.status(201).json({
      success: true,
      file,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    next(error);
  }
};
