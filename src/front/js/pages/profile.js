import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      {store.token ? (
        <>
          <div className="alert alert-success" role="alert">
            Pagina Privada, Acceso concedido!
          </div>
        </>
      ) : (
        <>
          <div className="alert alert-danger" role="alert">
            Pagina Privada, Acceso denegado!
            {navigate("/")}
          </div>
        </>
      )}
    </div>
  );
};
