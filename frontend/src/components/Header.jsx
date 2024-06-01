import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/logo.png";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const { user } = useSelector((state) => {
    return state.auth;
  });

  const onlogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully", toastOptions);
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="flex justify-between mx-4 border-b-2 items-center">
      <div className="flex items-center align-middle">
        <img className="w-16 h-16 m-2 object-cover" src={Logo} alt="" />
        <h1 className="text-2xl font-bold my-4">FastLog</h1>
      </div>
      {user ? (
        <ul className="flex gap-8 text-lg m-4 items-center">
          <li>
            Welcome{" "}
            <span className="font-semibold">{user && user.userName}</span>
          </li>
          <li>
            <button
              className="border px-4 py-1 rounded-lg bg-red-500 text-white"
              onClick={onlogout}
            >
              Logout
            </button>
          </li>
          <a target="_blank" href="https://github.com/ShivanshAr97/FastLog">
            <li>
              <FaGithub size={24} />
            </li>
          </a>
        </ul>
      ) : (
        <ul className="flex gap-8 text-lg m-4 items-center">
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/register">
            <li>Register</li>
          </Link>
          <a target="_blank" href="https://github.com/ShivanshAr97/FastLog">
            <li>
              <FaGithub size={24} />
            </li>
          </a>
        </ul>
      )}
    </div>
  );
};

export default Header;
