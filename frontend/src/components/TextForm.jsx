import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GrUpdate } from "react-icons/gr";
import { getTexts, updateText } from "../features/texts/textSlice";
import { reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const TextForm = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { texts, isLoading, isError, message } = useSelector(
    (state) => state.texts
  );

  useEffect(() => {
    if (user) {
      dispatch(getTexts())
        .then((result) => {
          console.log(result.payload);
          setText(result.payload.text);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, []);

  const updateChanges = () => {
    if (user) {
    dispatch(updateText({ text }))
      .then((result) => {
        console.log(result.payload);
        setText(result.payload.text);
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    updateChanges()
  }, [setText]);

  return (
    <>
      <div className="justify-between flex align-middle items-center">
        <h1 className="text-xl">Paste Data</h1>
        <button onClick={updateChanges}>
          <GrUpdate />
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
