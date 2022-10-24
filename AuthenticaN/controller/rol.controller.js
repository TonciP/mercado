const db = require("../models");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { rol } = require("../models");

exports.index = async (req, res) => {
  const listaRol = await db.rol.findAll();
  res.send(listaRol);
};

exports.storeRol = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "La id es requerido",
    });
    return;
  }
  if (!req.body.idrol) {
    res.status(400).send({
      message: "La idrol es requerido",
    });
    return;
  }
  const usuario = await db.user.findByPk(req.params.id);
  /* usuario.setRols(req.body.idrol); */
  usuario.addRols(req.body.idrol);
  res.send(usuario);
};
exports.storeRols = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "La id es requerido",
    });
    return;
  }
  if (!req.body.idrol) {
    res.status(400).send({
      message: "La idrol es requerido",
    });
    return;
  }
  const usuario = await db.user.findByPk(req.params.id);
  usuario.setRols(req.body.idrol);
  //usuario.addRols(req.body.idrol);
  res.send(usuario);
};
