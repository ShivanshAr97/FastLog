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
    return("New")
  }
  else{
    res.status(200).json(existingText);
    return ("Old")
  }
});

const updateText = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user ID in the request
    const newText = req.body.text; // Assuming you send updated text in the request body
    const existingText = await contentModel.findOne({ user: userId });
    if (!existingText) {
      return res.status(404).json({ error: "Text not found" });
    }
    existingText.text = newText; // Update the text
    const updatedText = await existingText.save();

    console.log("Text updated successfully:", updatedText);
    res.status(200).json(updatedText);
  } catch (error) {
    console.error("Error updating text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// const updateText = asyncHandler(async (req, res) => {
//   if (!textId) {
//     await findTextId();
//     if (!textId) {
//       return res.status(404).json({ error: "Text not found" });
//     }
//   }
//   try {
//     const updatedText = await contentModel.findByIdAndUpdate(
//       textId,
//       { text: req.body }, // Assuming req.body is the updated text
//       { new: true }
//     );
//     if (!updatedText) {
//       return res.status(404).json({ error: "Failed to update text" });
//     }
    
//     console.log(updatedText);
//     res.status(200).json(updatedText);
//   } catch (error) {
//     console.error("Error updating text:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// const updateText = asyncHandler(async (req, res) => {
  // console.log(req.body);
  // try {
  //   const updatedText = await contentModel.findByIdAndUpdate(
  //     {_id:req.body.id},{text:req.body.text},
  //     {
  //       new: true,
  //     }
  //   );
  //   if (!updatedText) {
  //     return res.status(404).json({ error: "Failed to update text" });
  //   }
    
  //   console.log(updatedText);
  //   await updatedText.save();
  //   res.status(200).json(updatedText);
  // } catch (error) {
  //   console.error("Error updating text:", error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
// });


export { getText, updateText };
