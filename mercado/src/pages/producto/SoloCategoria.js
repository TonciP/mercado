import { wait } from "@testing-library/user-event/dist/utils";
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
function SoloCategoria() {
  const token = useSelector((state) => state.login.token);

  const [listaCategoria, setCategoria] = useState([]);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const cerrarSesion = () => {
    dispatch(sesionCerrada());
    navigate("/");
  };

  useEffect(() => {
    if (token === null) {
      console.log(token);
      navigate("/");
    }
    GetCategoria();
  }, []);

  const [listaProducto, setProducto] = useState([]);

  const GetCategoria = () => {
    //event.preventDefault();

    var urlcategoria = "http://127.0.0.1:8000/api/categoria/";
    axios
      .get(urlcategoria)
      .then((response) => {
        setCategoria(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const selectCategoria = (id) => {
    var urlempresa = "http://127.0.0.1:8000/api/producto/";
    axios
      .get(urlempresa)
      .then((response) => {
        setCategoria(response.data);
        //obtenerPermisos(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editarCategoria = (id) => {
    /* var urlempresa = "http://127.0.0.1:8000/api/categoria/" + id + "/";
    axios
      .post(urlempresa)
      .then((response) => {
        setCategoria(response.data);
        //obtenerPermisos(token);
      })
      .catch((error) => {
        console.log(error);
      }); */
      navigate("/crearCategoria/" + id);
  };
  const eliminarCategoria = (id) => {
    var urlempresa = "http://127.0.0.1:8000/api/categoria/" + id + "/";
    axios
      .delete(urlempresa)
      .then((response) => {
        setCategoria(response.data);
        //obtenerPermisos(token);
        navigate("/listcategoria");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="conten-empresas">
      <div id="scroll-productos">
        <h1>Categoria</h1>
        <div className="wrapper">
          {listaCategoria.map((item) => (
            <div className="album" key={"categoria" + item.id}>
              <img
                src="https://hipermaxi.com/wp-content/uploads/2021/05/lindt1-768x768.jpg"
                width={"200px"}
                height={"200px"}
              ></img>
              <h4>{item.nombre}</h4>
              <Button
                variant="danger"
                onClick={() => {
                  eliminarCategoria(item.id);
                }}
              >
                Eliminar
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  editarCategoria(item.id);
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

export default SoloCategoria;
