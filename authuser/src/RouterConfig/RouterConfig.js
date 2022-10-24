import React from "react";

import { Routes, Route } from "react-router-dom";
import FormUsuario from "../pages/form/FormUsuario";
import Home from "../pages/Home";

import Login from "../pages/login/Login";
import Register from "../pages/login/Register";
import Usuario from "../pages/usuario/Usuario";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      {<Route path="/home" element={<Home />} />}
      {<Route path="/usuarios" element={<Usuario />} />} 
      {<Route path="/usuario/:id" element={<FormUsuario />} />} 
    </Routes>
  );
};
export default RouterConfig;
