import axios from "axios";
import { Dropdown } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ListaCategoria() {
  const [listaCategoria, setCategoria] = useState([]);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    GetCategoria();
  }, []);
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
  return (
    <div>
        <h1>Categoria</h1>
      <div className="wrapper">
        {listaCategoria.map((item) => (
          <div className="album" key={"categoria" + item.id}>
            <button
              className="btn btn-primary"
              onClick={() => selectCategoria(item.id)}
            >
              {item.nombre}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaCategoria;
