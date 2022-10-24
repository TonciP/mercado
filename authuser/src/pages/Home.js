import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { sesionCerrada } from "../redux/loginSlice";
import "./../style/Home.css";
import { usuarioTienePermisos } from "../utils/roleUtils";

function Home() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const permisos = useSelector((state) => state.login.permisos);
  const token = useSelector((state) => state.login.token);
  const [superAdmin, setSuperAdmin] = useState(false);

  const cerrarSesion = () => {
    dispatch(sesionCerrada());
    navigate("/");
  };

  useEffect(() => {
    if (token === null) {
      console.log(token);
      navigate("/");
    }
    //console.log(permisos);
    if (permisos !== null) {
      if (Array.isArray(permisos)) {
        setSuperAdmin(
          usuarioTienePermisos("Super Administrador", permisos)
        );
      } else {
        setSuperAdmin(
          usuarioTienePermisos("Super Administrador", JSON.parse(permisos))
        );
      }
    }
  }, [permisos]);

  return (
    <div>
      <div className="nav" id="menu">
        <div className="contenedor-menu">
          <div className="imgheader">
            <img src="https://www.viafirma.com/blog-xnoccio/wp-content/uploads/sites/3/2021/12/Seguridad-en-tus-operaciones-1568x1046.jpg"></img>
          </div>

          <div className="titulo-principal">
            <h2>Sistema de Autenticacion</h2>
          </div>

          <div className="opciones-menu">
            <ul className="lista-menu">
              <li>
                <Link to={"/usuarios"}>Lista de Usuarios</Link>
              </li>
              <li>
                <Link to={"/usuario/0"}>Crear Usuario</Link>
              </li>
              {token && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    cerrarSesion();
                    setSuperAdmin(false);
                  }}
                >
                  Cerrar sesión
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
