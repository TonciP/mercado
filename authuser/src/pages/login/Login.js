import Button from "@restart/ui/esm/Button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  guardarPermisos,
  guardarUsuario,
  sesionIniciada,
} from "../../redux/loginSlice";

import "./../../style/Login.css";

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const token = useSelector((state) => state.login.token);
  const idUsuario = useSelector((state) => state.login.token);

  // validaion de inicio de sesion
  useEffect(() => {
    if (token !== null) navigate("/home");
    //if(cargoLista === false)
    // dispatch(guardarPermisos(permisos));
  });

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
      email,
      password,
    };

    var loginUrl = "http://127.0.0.1:3000/api/usuario/loginSuper";
    axios
      .post(loginUrl, params, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        const token = response.data.access;
        const refresh = response.data.refresh;
        dispatch(sesionIniciada(token));
        navigate("/home");

        const roles = response.data.user.rols;
        var permisos = [];
        roles.forEach((rol) => {

          if (!permisos.includes(rol)) {
            permisos.push(rol);
          }
        });
        dispatch(guardarPermisos(permisos));
      })
      .catch((error) => {
        console.log(error);
        alert("No es un usuario autorizado");
      });
  };

  return (
    <div className="Login">
      <h1>Sistema de Autenticacion</h1>
      <Form className="formLogin">
        <Form.Group size="lg" controlId="email">
          <Form.Label>Nombre de Usuario</Form.Label>
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
          onClick={() => loguer()}
        >
          Login
        </Button>
        <Link to="/register">Registrarse</Link>
      </Form>
    </div>
  );
}
export default Login;
