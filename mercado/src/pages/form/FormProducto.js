import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const FormProducto = () => {
  let { id } = useParams();
  const [nombres, setNombres] = useState("");
  const [precio, setPrecio] = useState("");
  const [archivo, setArchivo] = useState("");
  const [foto, setFoto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [empresa, setEmpresa] = useState("");

  const [listaCategoria, setListCategoria] = useState([]);
  const [listaEmpresa, setListEmpresa] = useState([]);
  const token = useSelector((state) => state.login.token);
  let navigate = useNavigate();

  useEffect(() => {
    if (id === 0) {
      GetCategoria();
      Getempresa();
      return;
    }
    fetchDatosProducto(id);
    GetCategoria();
    Getempresa();
  }, [id]);

  useEffect(() => {
    if (token === null) {
      console.log(token);
      navigate("/");
    }
  });
  
  const GetCategoria = () => {
    //event.preventDefault();

    var urlcategoria = "http://127.0.0.1:8000/api/categoria/";
    axios
      .get(urlcategoria)
      .then((response) => {
        setListCategoria(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Getempresa = () => {
    //event.preventDefault();

    var urlempresa = "http://127.0.0.1:8000/api/listempresa/";
    axios
      .get(
        urlempresa /* {
        headers: {
          Authorization: "Bearer " + token,
        },
      } */
      )
      .then((response) => {
        setListEmpresa(response.data);
        //obtenerPermisos(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDatosProducto = (id) => {
    const url = "http://127.0.0.1:8000/api/producto/" + id + "/";
    axios
      .get(url)
      .then((response) => {
        const objproducto = response.data;
        setNombres(objproducto.nombre);
        setPrecio(objproducto.precio);
        setFoto(objproducto.foto);
        setCategoria(objproducto.lcategoria);
        setEmpresa(objproducto.lempresa);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const enviarDatos = () => {
    const params = {
      nombre: nombres,
      precio: precio,
      lcategoria: categoria,
      lempresa: empresa,
    };
    if (id == 0) {
      insertarProducto(params);
    } else {
      actualizarProducto(params);
    }
  };
  const insertarProducto = (params) => {
    const url = "http://127.0.0.1:8000/api/producto/";
    const data = new FormData();
    data.append("foto", archivo);
    data.append("nombre", nombres);
    data.append("precio", precio);
    data.append("lcategoria", categoria);
    data.append("lempresa", empresa);
    params.foto = archivo;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(url, data, { config })
      .then((response) => {
        console.log("recibido", response.data);
        navigate("/productos");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  };
  const actualizarProducto = (params) => {
    const url = "http://127.0.0.1:8000/api/producto/" + id + "/";

    axios
      .put(url, params, {})
      .then((response) => {
        console.log("recibido", response.data);
        navigate("/productos");
      })
      .catch((error) => {
        console.log(error);
        //if (error.response.status === 401) {
        //    history.push('/');
        //}
      });
  };
  return (
    <div>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Formulario de Producto</Card.Title>

              <div>
                <input
                  className="form-control"
                  type="text"
                  value={nombres}
                  onChange={(e) => {
                    setNombres(e.target.value);
                  }}
                  placeholder="Nombre"
                />
              </div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  value={precio}
                  onChange={(e) => {
                    setPrecio(e.target.value);
                  }}
                  placeholder="Precio"
                />
              </div>
              <div>
                <select
                  className="form-select"
                  value={categoria}
                  onChange={(e) => {
                    setCategoria(e.currentTarget.value);
                  }}
                >
                  {listaCategoria.map((item) => (
                    <option value={item.id}>{item.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  className="form-select"
                  value={empresa}
                  onChange={(e) => {
                    setEmpresa(e.currentTarget.value);
                  }}
                >
                  {listaEmpresa.map((item) => (
                    <option value={item.id}>{item.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  className="form-control"
                  type="file"
                  onChange={(e) => {
                    // console.log(e.target.files[0])
                    setArchivo(e.target.files[0]);
                  }}
                />
              </div>
              <div>{foto && <img src={foto} alt="foto" width="200" />}</div>
              <div>{nombres.length} caracteres</div>
              <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                Guardar
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FormProducto;
