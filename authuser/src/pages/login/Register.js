import React, { useState } from "react";
import Button from "@restart/ui/esm/Button";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  guardarPermisos,
  guardarUsuario,
  refreshToken,
  sesionIniciada,
} from "../../redux/loginSlice";
import "./../../style/Login.css";
import axios from "axios";
function Register() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [nombrecompleto, setNombrecompleto] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    if (email.length > 0 && password.length > 0) {
      return true;
    }
    return false;
  }
  const loguer = () => {
    //event.preventDefault();
    const params = {
      nombrecompleto,
      email,
      password,
    };

    var loginUrl = "http://127.0.0.1:3000/api/usuario";
    axios
      .post(loginUrl, params)
      .then((response) => {
        console.log(response.data);
        //const token = response.data.access;
        //const refresh = response.data.refresh;
        //dispatch(sesionIniciada(token))
        //dispatch(refreshToken(refresh))
        //obtenerPermisos(token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="Login">
      <h1>Sistema de Autenticacion</h1>
      <Form className="formLogin">
        <Form.Group size="lg" controlId="email">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={nombrecompleto}
            onChange={(e) => setNombrecompleto(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          size="lg"
          type="button"
          disabled={!validateForm()}
          onClick={loguer}
        >
          Registrar
        </Button>
      </Form>
    </div>
  );
}

export default Register;
