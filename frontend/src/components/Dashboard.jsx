import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTexts } from "../features/texts/textSlice";
import { reset } from "../features/auth/authSlice";
import TextForm from "./TextForm";
import Loading from "../components/Loading";
import TextItems from "./TextItems";
import FileForm from "./FileForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  window.onbeforeunload = function (e) {
    e = e || window.event;

    e.returnValue = "You want to leave ? ";
  };

  const { user } = useSelector((state) => state.auth);
  const { texts, isLoading, isError, message } = useSelector(
    (state) => state.texts
  );
  console.log(texts);
  useEffect(() => {
    if (isError) {
      console.log(message);
      navigate("/login");
    }
    if (user) {
      dispatch(getTexts());
    }
    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mx-6">
      <h1 className="text-2xl my-2">
        Welcome <span className="font-semibold">{user && user.userName}</span>
      </h1>
      <div className="border my-2"></div>
      <FileForm />
      <div className="border my-2"></div>
      <TextForm />
      <section>
        {texts.length > 0 ? (
          <div>
            {texts.map((text) => (
              <TextItems key={text._id} text={text} />
            ))}
          </div>
        ) : (
          "No texts"
        )}
      </section>
    </div>
  );
};

export default Dashboard;
