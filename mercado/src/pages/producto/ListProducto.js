import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { Dropdown } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  refreshToken,
  sesionCerrada,
  sesionIniciada,
  guardarProductos,
  eliminarProductos,
  guardarIdEmpresa,
} from "../../redux/loginSlice";
import GoogleMaps from "simple-react-google-maps"
import "../../style/Empresa.css";
import "../../style/producto.css";
import Home from "../Home";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const ListProducto = () => {
  /* const { id } = props.match ? props.params : { id: 0 }; */
  let { idempresa } = useParams();
  const token = useSelector((state) => state.login.token);
  const storageEmpresaId = useSelector((state) => state.login.idEmpresa);
  const [listaCategoria, setCategoria] = useState([]);
  const [carritoLista, setCarrito] = useState([]);
  const [listaProducto, setProducto] = useState([]);
  const [cargoProducto, setlistaProducto] = useState(false);
  const [total, setTotal] = useState(0);
  const productos = useSelector((state) => state.login.productos);

  const [show, setShow] = useState(false);
  const [showmapa, setShowMapa] = useState(false);

  const handleCloseMapa = () => setShowMapa(false);
  const handleShowMapa = () => setShowMapa(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

    GetProducto();
    GetCategoria();
  }, []);

  useEffect(() => {
    if (storageEmpresaId === null) {
      dispatch(guardarIdEmpresa(idempresa));
    }
    if (idempresa != 0) {
      //debugger;
      if (idempresa !== storageEmpresaId) {
        dispatch(eliminarProductos());
        dispatch(guardarIdEmpresa(idempresa));
        return;
      } else {
        if (productos !== null && productos.length > 0) {
          // se obtiene los productos en el localStorage

          if (Array.isArray(productos)) {
            setCarrito(productos);
            GetTotalCarritoBs(productos);
          } else {
            setCarrito(JSON.parse(productos));
            GetTotalCarritoBs(JSON.parse(productos));
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (carritoLista.length > 0) {
      dispatch(guardarProductos(carritoLista));
    }
  }, [carritoLista]);

  const GetTotalCarritoBs = (listaproducto) => {
    var totalPagar = 0;
    listaproducto.forEach((producto) => {
      totalPagar = totalPagar + parseInt(producto.precio);
    });
    //debugger;
    setTotal(totalPagar);
  };

  const GetProducto = async () => {
    //event.preventDefault();

    var urlempresa =
      "http://127.0.0.1:8000/api/producto/" + idempresa + "/categoria/";
    await axios
      .get(urlempresa)
      .then((response) => {
        setProducto(response.data);
        //obtenerPermisos(token);
        setlistaProducto(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navegateProducto = () => {
    navigate("/productos");
  };

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

  const eliminarProductoCart = (producto, indexItem) => {
    setTotal(total - producto.precio);
    setCarrito((prevState) =>
      prevState.filter((todo, index) => index !== indexItem)
    );
  };

  const eliminarProductosCarrito = () => {
    setTotal(0);
    setCarrito([]);
    dispatch(eliminarProductos());
  };
  const Ircarrito = () => {
    if (token === null) {
      // mostrarun modal para iniciar sesion
      handleShow();
    } else {
      //mostrar el modal del carrito para la compra
      handleShowMapa();
    }
  };
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };
  return (
    <div id="conten-empresas">
      <div id="main">
        <h1>PRODUCTOS</h1>
        <div id="conten-product">
          <div id="scroll-productos">
            <div className="wrapper">
              {listaCategoria.map((categoria) => (
                <div className="album" key={"categoria" + categoria.id}>
                  <h5>{categoria.nombre}</h5>
                  {listaProducto.map((producto) => (
                    <div
                      className="album"
                      key={"producto" + producto.id}
                      onClick={() =>
                        setCarrito((prevCount) => {
                          setTotal(total + parseInt(producto.precio));
                          return prevCount.concat(producto);
                        })
                      }
                    >
                      {producto.lcategoria === categoria.id ? (
                        <div>
                          <div>{producto.nombre}</div>
                          <div>
                            <div>
                              <img
                                src={producto.foto}
                                width={"200px"}
                                height={"200px"}
                              />
                            </div>
                          </div>
                          <div>
                            <p>{producto.precio} Bs</p>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5>Carrito</h5>
            <aside className="col-sm-4">
              <ul id="carrito" className="list-group">
                <li className="list-group-item text-right mx-2">
                  {carritoLista.map((item, index) => (
                    <div key={"carrito" + index}>
                      {item.nombre + " " + item.precio + " Bs"}

                      <button
                        id="btneliminarcart"
                        className="btn btn-danger mx-5"
                        data-item="3"
                        onClick={() => eliminarProductoCart(item, index)}
                      >
                        <i className="bi bi-x-circle-fill"></i>
                      </button>
                    </div>
                  ))}
                </li>
              </ul>

              <p className="text-right">
                Total: {total} <span id="total">Bs</span>
              </p>
              <div id="btnCarrito">
                <button
                  id="boton-vaciar"
                  className="btn btn-danger"
                  onClick={() => eliminarProductosCarrito()}
                >
                  Vaciar <i className="bi bi-x-square-fill"></i>
                </button>
                <button
                  id="boton-vaciar"
                  className="btn btn-primary"
                  onClick={() => Ircarrito()}
                >
                  Carrito <i className="bi bi-cart4"></i>
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
      /* modal para ir a carrito */
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inicie Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="lista-menu">
            {" "}
            <li>
              <Link to={"/"}>Iniciar Session</Link>
            </li>{" "}
          </ul>{" "}
        </Modal.Body>
      </Modal>
      {/* modal para inicio de session */}
      {
        <Modal show={showmapa} onHide={handleCloseMapa} fullscreen={true}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ height: "12vh", width: "100%" }}>Mapa de google</div>
            <GoogleMaps
              apiKey={"AIzaSyAPtlt_C0sXF3FXzusIENvNwb_jGc2qP5Y"}
              style={{ height: "100%", width: "100%" }}
              zoom={6}
              center={{ lat: -17.783742, lng: -63.11491 }}
              markers={{ lat: -17.783742, lng: -63.11491 }} //optional
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseMapa}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseMapa}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
};

export default ListProducto;
