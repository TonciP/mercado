import axios from "axios";
import { Dropdown } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  refreshToken,
  sesionCerrada,
  sesionIniciada,
} from "../../redux/loginSlice";

import "../../style/Empresa.css";
import Home from "../Home";
function Usuario() {
  const [listaUsuarios, setUsuarios] = useState([]);
  const token = useSelector((state) => state.login.token);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    if (token === null) {
      console.log(token);
      navigate("/");
    }
    GetUsuarios();
  }, []);

  const GetUsuarios = async () => {
    //event.preventDefault();

    var urlempresa = "http://127.0.0.1:3000/api/usuario/";
    await axios
      .get(urlempresa, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUsuarios(response.data);
        //obtenerPermisos(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editarUsuario = (id) => {
    /* var urlempresa = "http://127.0.0.1:8000/api/producto/" + id + "/";
    axios
      .post(urlempresa)
      .then((response) => {
        //setCategoria(response.data);
        //obtenerPermisos(token);
      })
      .catch((error) => {
        console.log(error);
      }); */
      navigate("/usuario/" + id);
  };
  const eliminarUsuario = (id) => {
    var urlempresa = "http://127.0.0.1:3000/api/usuario/" + id + "/";
    axios
      .delete(urlempresa,
        {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
      .then((response) => {
        //setUsuarios(response.data);
        //obtenerPermisos(token);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="conten-empresas">
        <Home />
        <h1>Lista de usuarios</h1>
      <div id="scroll-productos">
        <div className="wrapper">
          {listaUsuarios.map((item) => (
            <div className="album" key={"producto" + item.id}>
              <div>{item.nombrecompleto}</div>
              <div>
                <p>{item.email}</p>
              </div>
              <Button
                variant="danger"
                onClick={() => {
                  eliminarUsuario(item.id);
                }}
              >
                Eliminar
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  editarUsuario(item.id);
                }}
              >
                Editar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Usuario;
