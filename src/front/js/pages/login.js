import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    let response = await actions.login(email, password);
    if (response) {
      {
        navigate("/private");
        console.log("Credenciales válidas");
      }
    } else {
      console.log("Credenciales inválidas");
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Log in!!</h1>
      <input
        type="text"
        placeholder="email"
        className="ml-2"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleClick}> Lets go </button>
      <p>
        Not having an account?
        <Link to="/signup">
          <a>Press here then</a>
        </Link>
      </p>
    </div>
  );
};
