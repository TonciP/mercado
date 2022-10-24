import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory, useNavigate, useParams } from "react-router-dom"; 
import { useSelector } from "react-redux";

const FormCategoria = () => {
  let { id } = useParams();
    const [nombres, setNombres] = useState("");
    const token = useSelector((state) => state.login.token);
    let navigate = useNavigate();
  
    useEffect(() => {
      if (id === 0) {

        return;
      }
      fetchDatosProducto(id);

    }, [id]);

    useEffect(() => {
      if (token === null) {
        console.log(token);
        navigate("/");
      } 
    });

    const enviarDatos = () => {
      const params = {
        nombre: nombres,
      };
      if (id === 0) {
        insertarCategoria(params);
      } else {
        actualizarCategoria(params);
      }
    };
    const fetchDatosProducto = (id) => {
      const url = "http://127.0.0.1:8000/api/categoria/" + id + "/";
      axios
        .get(url)
        .then((response) => {
          const objproducto = response.data;
          setNombres(objproducto.nombre);

        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    const insertarCategoria = (params) => {
      const url = "http://127.0.0.1:8000/api/categoria/";
      const data = new FormData();
          data.append("nombre", nombres);

          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          }
      axios
        .post(url, data, {config})
        .then((response) => {
          console.log("recibido", response.data);
          navigate("/listcategoria");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            navigate("/");
          }
        });
    };
    const actualizarCategoria = (params) => {
      const url = "http://127.0.0.1:8000/api/categoria/" + id + "/";
  
      axios
        .put(url, params, {})
        .then((response) => {
          console.log("recibido", response.data);
          navigate("/listcategoria");
        })
        .catch((error) => {
          console.log(error);
          //if (error.response.status === 401) {
          //    history.push('/');
          //}
        });
    };
  return (
    <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Formulario de Categoria</Card.Title>

              <div>
                <label>Nombres:</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  value={nombres}
                  onChange={(e) => {
                    setNombres(e.target.value);
                  }}
                />
              </div>
              <div>{nombres.length} caracteres</div>
              <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                Guardar
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  )
}

export default FormCategoria