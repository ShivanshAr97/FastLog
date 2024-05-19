import React from "react";
import { useDispatch } from "react-redux";

const TextItems = ({text}) => {
  const dispatch = useDispatch();
  return (
    <div>
      <p className="">{new Date(text.createdAt).toLocaleString()}</p>
      <h2>{text.text}</h2>
    </div>
  );
};

export default TextItems;
