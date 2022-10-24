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
function SoloProducto() {
  const [listaProducto, setProducto] = useState([]);
  const token = useSelector((state) => state.login.token);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    if (token === null) {
      console.log(token);
      navigate("/");
    }
    GetProducto();
  }, []);

  const GetProducto = async () => {
    //event.preventDefault();

    var urlempresa = "http://127.0.0.1:8000/api/producto/";
    await axios
      .get(urlempresa)
      .then((response) => {
        setProducto(response.data);
        //obtenerPermisos(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editarProducto = (id) => {
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
      navigate("/crearProducto/" + id);
  };
  const eliminarProducto = (id) => {
    var urlempresa = "http://127.0.0.1:8000/api/producto/" + id + "/";
    axios
      .delete(urlempresa)
      .then((response) => {
        //setProducto(response.data);
        //obtenerPermisos(token);
        navigate("/listproducto");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="conten-empresas">
      <div id="scroll-productos">
        <div className="wrapper">
          {listaProducto.map((item) => (
            <div className="album" key={"producto" + item.id}>
              <div>{item.nombre}</div>
              <div>
                <div>
                  <img src={item.foto} width={"200px"} height={"200px"} />
                </div>
              </div>
              <div>
                <p>{item.precio}</p>
              </div>
              <Button
                variant="danger"
                onClick={() => {
                  eliminarProducto(item.id);
                }}
              >
                Eliminar
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  editarProducto(item.id);
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

export default SoloProducto;
