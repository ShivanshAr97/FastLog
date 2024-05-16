import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return state.auth;
  });

  const onlogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="flex justify-between mx-4 border-b-2">
      <h1 className="text-2xl font-bold m-4"> 
      FastLog
      </h1>
      {user ? (
        <ul className="flex gap-8 text-lg m-4">
          <li>
            <button onClick={onlogout}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul className="flex gap-8 text-lg m-4">
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/register">
            <li>Register</li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Header;
