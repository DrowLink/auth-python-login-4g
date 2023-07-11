import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Signup = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Sign up!!</h1>
      <p>Email</p>
      <input type="text" placeholder="email" className="ml-2" />
      <p>Password</p>
      <input type="password" placeholder="password" />
      <button> Lets go </button>
    </div>
  );
};
