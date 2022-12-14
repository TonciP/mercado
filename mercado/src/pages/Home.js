import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { sesionCerrada } from "../redux/loginSlice";
import "./../style/Home.css";
import { usuarioTienePermisos } from "../utils/roleUtils";
import Header from "../components/Header";
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
    /* if (token === null) {
      console.log(token);
      navigate("/");
    } */
    //console.log(permisos);
    if (permisos !== null) {
      if (Array.isArray(permisos)) {
        setSuperAdmin(
          usuarioTienePermisos("Administrador de Mercado", permisos)
        );
      } else {
        setSuperAdmin(
          usuarioTienePermisos("Administrador de Mercado", JSON.parse(permisos))
        );
      }
    }
  }, [permisos]);

  return (
    <div>
      <div className="nav" id="menu">
        <div className="contenedor-menu">
          <div className="imgheader">
            <img src="https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/pesquisa-de-mercado.png"></img>
          </div>

          <div className="titulo-principal">
            <h2>Sistema de Mercado</h2>
          </div>

          <div className="opciones-menu">
            <ul className="lista-menu">
              {!token && (
                <div>
                  <li>
                    <Link to={"/"}>Iniciar Session</Link>
                  </li>
                  <li>
                    <Link to={"/register"}>Registrarse</Link>
                  </li>
                </div>
              )}
              <li>
                <Link to={"/empresas"}>Lista de Empresas</Link>
              </li>

              {/* <li>
                <Link to={"/productos"}>Lista de Productos</Link>
              </li> */}
              {superAdmin ? (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    ABM Producto
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <li>
                      <Link to={"/crearproducto/0"}>Crear Producto</Link>
                    </li>
                    <li>
                      <Link to={"/listproducto"}>Lista de Producto</Link>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                ""
              )}
              {superAdmin ? (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    ABM Categoria
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <li>
                      <Link to={"/crearcategoria/0"}>Crear Categoria</Link>
                    </li>
                    <li>
                      <Link to={"/listcategoria"}>Lista de Categoria</Link>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                ""
              )}
              {token && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    cerrarSesion();
                    setSuperAdmin(false);
                  }}
                >
                  Cerrar sesi??n
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
