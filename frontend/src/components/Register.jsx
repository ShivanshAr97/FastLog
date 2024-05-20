import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Loading from "../components/Loading";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    userName: "",
    passkey: "",
  });

  const { userName, passkey } = data;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => {
      return state.auth;
    }
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    const genPasskey = () => {
      const randomNumber = Math.floor(Math.random() * 90000) + 10000;
      return randomNumber;
    };
    setData((prevState) => ({ ...prevState, passkey: genPasskey() }));
  }, []);

  const onsubmit = (e) => {
    e.preventDefault();
    const data = {
      userName,
      passkey,
    };

    dispatch(register(data));
    console.log(data);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="justify-center flex text-4xl my-12">Create account</h1>
      <section className="flex justify-center w-fit mx-auto">
        <form onSubmit={onsubmit}>
          <input
            className="outline-none text-xl px-4 py-2 my-4 w-[25rem] border rounded-lg"
            type="text"
            name="userName"
            value={userName}
            placeholder="Enter your name"
            onChange={(e) => {
              setData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <br />
          <input
            className="outline-none text-xl px-4 py-2 my-4 w-[25rem] border rounded-lg"
            type="text"
            name="passkey"
            value={passkey}
          />
          <br />
          <p className="text-red-700 text-center">Remember this passkey as this will be <br />needed to login to the account</p>
          <br />
          <button
            type="submit"
            className="bg-blue-300 flex mx-auto tounded-lg text-xl px-4 my-4 py-1 rounded-lg"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Register;
