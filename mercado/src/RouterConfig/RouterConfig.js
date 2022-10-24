import React from "react";
import Login from "../pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ListEmpresa from "../pages/empresa/ListEmpresa";
import ListProducto from "../pages/producto/ListProducto";
import Register from "../pages/Register";
import SoloCategoria from "../pages/producto/SoloCategoria";
import SoloProducto from "../pages/producto/SoloProducto";
import FormProducto from "../pages/form/FormProducto";
import FormCategoria from "../pages/form/FormCategoria";
const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/empresas" element={<ListEmpresa />} />
      <Route path="/productos/:idempresa" element={<ListProducto />} />
      {/* <Route
        path="/productos/:id"
        element={<ListProducto />}
        render={({ match }) => {
          return <ListProducto id={match.params.id} />;
        }}
      /> */}

      <Route path="/listproducto" element={<SoloProducto />} />
      <Route path="/listcategoria" element={<SoloCategoria />} />

      <Route path="/crearproducto/:id" element={<FormProducto />} />
      <Route path="/crearcategoria/:id" element={<FormCategoria />} />
    </Routes>
  );
};
export default RouterConfig;
