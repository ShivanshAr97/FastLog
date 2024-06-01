import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Loading from "../components/Loading";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => {
      return state.auth;
    }
  );

  const [userData, setuserData] = useState({
    userName: "",
    passkey: "",
  });

  const { userName, passkey } = userData;

  useEffect(() => {
    if (isError) {
      toast.error(message,toastOptions);
      console.log(message);
    }
    if (isSuccess && user) {
      toast.success("Logged in",toastOptions);
      navigate("/");
    }
    dispatch(reset());
  }, [user, message, navigate, dispatch]);

  const onsubmit = (e) => {
    e.preventDefault();
    const userData = {
      userName,
      passkey,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="justify-center flex text-4xl my-12">
        Login to the account
      </h1>
      <section className="flex justify-center">
        <form onSubmit={onsubmit}>
          <input className="outline-none text-xl px-4 py-2 border w-[25rem] rounded-lg"
            type="text"
            name="userName"
            value={userName}
            placeholder="Enter your name"
            onChange={(e) => {
              setuserData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <br />
          <input
          className="outline-none text-xl px-4 py-2 my-8 w-[25rem] border rounded-lg"
            type="text"
            placeholder="Enter your passkey"
            name="passkey"
            value={passkey}
            onChange={(e) => {
              setuserData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <br />
          <button className="bg-blue-300 flex mx-auto tounded-lg text-xl px-4 my-4 py-1 rounded-lg" type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Login;
