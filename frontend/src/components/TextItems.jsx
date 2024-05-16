import React from "react";
import { deleteText } from "../features/texts/textSlice.js";
import { useDispatch } from "react-redux";

const TextItems = ({text}) => {
  const dispatch = useDispatch();
  return (
    <div>
      <p className="">{new Date(text.createdAt).toLocaleString()}</p>
      <h2>{text.text}</h2>
      <button onClick={() => dispatch(deleteText(text._id))}>X</button>
    </div>
  );
};

export default TextItems;
