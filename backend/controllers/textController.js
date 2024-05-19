import asyncHandler from "express-async-handler";
import contentModel from "../models/contentModel.js";

const getText = asyncHandler(async (req, res) => {
  const existingText = await contentModel.findOne({ user: req.user.id });

  if (!existingText) {
    const newText = await contentModel.create({
      text: "Enter text and click save above to save the session.",
      user: req.user.id
    });
    res.status(200).json(newText);
  }
  else{
    res.status(200).json(existingText);
  }
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

// const updateText = asyncHandler(async (req, res) => {
//   const text = await contentModel.findOne({ text: "Enter text and click save above to save the session." });

//   if (!text) {
//     return res.status(404).json({ error: "Text not found" });
//   }

//   try {
//     const updatedText = await contentModel.findByIdAndUpdate(
//       text._id,
//       req.body,
//       {
//         new: true,
//       }
//     );

//     if (!updatedText) {
//       return res.status(404).json({ error: "Failed to update text" });
//     }

//     console.log("Updated text:", updatedText);
//     res.status(200).json(updatedText);
//   } catch (error) {
//     console.error("Error updating text:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

let textId; // Declare a variable to store the ID outside the function scope

const findTextId = async () => {
  try {
    const text = await contentModel.findOne({ text: "Enter text and click save above to save the session." });
    if (text) {
      textId = text._id;
    }
  } catch (error) {
    console.error('Error finding text:', error);
  }
};

const updateText = asyncHandler(async (req, res) => {
  if (!textId) {
    await findTextId();
    if (!textId) {
      return res.status(404).json({ error: "Text not found" });
    }
  }
  try {
    const updatedText = await contentModel.findByIdAndUpdate(
      textId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedText) {
      return res.status(404).json({ error: "Failed to update text" });
    }
    await updatedText.save();
    console.log("Updated text:", updatedText);
    res.status(200).json(updatedText);
  } catch (error) {
    console.error("Error updating text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
