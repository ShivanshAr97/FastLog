import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GrUpdate } from "react-icons/gr";
import { getTexts, updateText } from "../features/texts/textSlice";
import { reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TextForm = () => {
  const [text, setText] = useState("");
  const [textFetched, setTextFetched] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { texts, isLoading, isError, message } = useSelector(
    (state) => state.texts
  );

  useEffect(() => {
    if (user && !textFetched) { 
      dispatch(getTexts())
        .then((result) => {
          console.log(result.payload);
          setText(result.payload.text);
          setTextFetched(true); 
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (!user) {
      navigate("/login");
    }
  
    return () => {
      dispatch(reset());
    };
  }, [dispatch, user, textFetched, text]); 

  const updateChanges = useCallback(() => {
    toast.success("Updated successfully")
    if (user) {
      dispatch(updateText({ text }))
        .then((result) => {
          // console.log(result.payload);
          setText(result.payload.text);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate("/login");
    }
  }, [dispatch, user, text]);

  return (
    <>
      <div className="justify-between flex align-middle items-center">
        <h1 className="text-xl">Paste Data</h1>
        <h1 className="text-xl font-semibold">Paste Data</h1>
        <button className="border px-4 py-1 rounded-lg bg-green-600 text-white" onClick={updateChanges}>
          Save
        </button>
      </div>
      <textarea
        className="w-[100%] h-[40rem] my-2 outline-none"
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </>
  );
};

export default TextForm;
