const jwt = require("jsonwebtoken");
const db = require("../models");

const config = process.env;

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "No tienes autorización" });
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "django-insecure-8n^vn52(ue3dv_o3^m0ktt1gic1=v$xluk5n#ggqm=(7aa&lk)");
    req.user = decoded;
    const usuario = await db.user.findOne({ where: { token: token } })
    if (!usuario) {
      return res.status(403).send("No es un usuario authorizado " + usuario.email);
    }
    
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
  return next();
};

module.exports = verifyToken;