import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // modificar
  const handleClick = async () => {
    let response = await actions.newUsers(user);
    if (response) {
      navigate("/");
    }
    console.log(response);
  };

  return (
    <div className="text-center mt-5">
      <h1>Sign up!!</h1>
      <p>Email</p>
      <input
        type="text"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        value={user.email || ""}
        placeholder="email"
        className="ml-2"
      />
      <p>Password</p>
      <input
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        value={user.password || ""}
        placeholder="password"
      />
      <button onClick={handleClick}> Lets go </button>
    </div>
  );
};
