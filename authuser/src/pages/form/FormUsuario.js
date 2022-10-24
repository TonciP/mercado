import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ButtonGroup, Card, Col, Row, ToggleButton } from "react-bootstrap";
import { useHistory, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const FormUsuario = () => {
  let { id } = useParams();
  const [nombrecompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [listarol, setListaRol] = useState([]);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("0");

  const token = useSelector((state) => state.login.token);
  let navigate = useNavigate();

  useEffect(() => {
    if (id === "0") {
      fetchDatosRol();
      return;
    }
    fetchDatosUsuario(id);
    fetchDatosRol();
  }, [id]);

  useEffect(() => {
    if (token === null) {
      console.log(token);
      navigate("/");
    }
  });

  const enviarDatos = () => {
    debugger;
    const params = {
      nombrecompleto: nombrecompleto,
      email: email,
      password: password,
    };
    if (id == 0) {
      insertarUsuario(params);
    } else {
      actualizarUsuario(params);
    }
  };
  const fetchDatosUsuario = (id) => {
    const url = "http://127.0.0.1:3000/api/usuario/" + id + "/";
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        debugger;
        const objusuario = response.data;
        setNombreCompleto(objusuario.nombrecompleto);
        setEmail(objusuario.email);
        setPassword(objusuario.password);
        setRadioValue(objusuario.rols[0].id);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const fetchDatosRol = () => {
    const url = "http://127.0.0.1:3000/api/rol/";
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        debugger;
        setListaRol(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const insertarUsuario = (params) => {
    const url = "http://127.0.0.1:3000/api/usuario/";
    /* const data = new FormData();
    data.append("nombrecompleto", nombrecompleto);
    data.append("email", email);
    data.append("password", password); */

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };
    axios
      .post(url, params, { config })
      .then((response) => {
        debugger;
        console.log("recibido", response.data);
        //navigate("/home");
        insertarRol(response.data.id);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  };
  const insertarRol = (id) => {
    const url = "http://127.0.0.1:3000/api/rol/usuarior/" + id;
    const data = {
      idrol: radioValue,
    };

    debugger;
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    axios
      .post(url, data, config)
      .then((response) => {
        console.log("recibido", response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  };
  const actualizarUsuario = (params) => {
    const url = "http://127.0.0.1:3000/api/usuario/" + id + "/";

    axios
      .put(url, params, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("recibido", response.data);
        //navigate("/home");
        insertarRol(id);
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

            {/* <div>
              <label>Nombres:</label>
            </div> */}
            <div>
              <input
                className="form-control"
                type="text"
                value={nombrecompleto}
                onChange={(e) => {
                  setNombreCompleto(e.target.value);
                }}
                placeholder="Nombre Completo"
              />
            </div>
            <div>
              <input
                className="form-control"
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
            </div>
            <div>
              <input
                className="form-control"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              />
            </div>
            <ButtonGroup className="mb-2">
              {listarol.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="secondary"
                  name="radio"
                  value={radio.id}
                  checked={radioValue === radio.id}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.rol}
                </ToggleButton>
              ))}
            </ButtonGroup>
            {radioValue}
            <button className="btn btn-primary mt-3" onClick={enviarDatos}>
              Guardar
            </button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default FormUsuario;
