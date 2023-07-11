import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Log in!!</h1>
      <input type="text" placeholder="email" className="ml-2" />
      <input type="password" placeholder="password" />
      <button> Lets go </button>

      <p>
        Not having an account?
        <Link to="/signup">
          <a>Press here then</a>
        </Link>
      </p>
    </div>
  );
};
