import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GrUpdate } from "react-icons/gr";
import { createText } from "../features/texts/textSlice";

const TextForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(createText({ text }));
    setText("");
  };

  return (
    <>
      <div className="justify-between flex align-middle items-center">
        <h1 className="text-xl">Paste Data</h1>
        <button><GrUpdate /></button>
      </div>
      <textarea className="w-[100%] h-[40rem] my-2 outline-none" autoFocus name="" id=""></textarea>
      
    </>
  );
};

export default TextForm;
