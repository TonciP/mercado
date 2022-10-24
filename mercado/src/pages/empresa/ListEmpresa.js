import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  refreshToken,
  sesionCerrada,
  sesionIniciada,
} from "../../redux/loginSlice";

import "../../style/Empresa.css";
import Home from "../Home";
function ListEmpresa() {
  const token = useSelector((state) => state.login.token);
  const [listaEmpresa, setEmpresa] = useState([]);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const cerrarSesion = () => {
    dispatch(sesionCerrada());
    navigate("/");
  };

  useEffect(() => {
    /* if (token === null) {
      console.log(token);
      navigate("/");
    } */
    Getempresa();
  }, []);

  const Getempresa = () => {
    //event.preventDefault();

    var urlempresa = "http://127.0.0.1:8000/api/listempresa/";
    axios
      .get(urlempresa, /* {
        headers: {
          Authorization: "Bearer " + token,
        },
      } */)
      .then((response) => {
        setEmpresa(response.data);
        //obtenerPermisos(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navegateProducto = (id) => {
    navigate("/productos/" + id);
  };
  return (
    <div id="conten-empresas">
      <h1>Empresas</h1>
      <div className="wrapper">
        {listaEmpresa.map((item) => (
          <div
            className="album"
            key={"empresa" + item.id}
            onClick={() => navegateProducto(item.id)}
          >
            <div>{item.nombre}</div>
            <div>
              <div>
                <img src={item.image} width={"200px"} height={"200px"} />
              </div>
            </div>
            <div>
              <p>{item.ubicacion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListEmpresa;
