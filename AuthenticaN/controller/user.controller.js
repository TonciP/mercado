const db = require("../models");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { rol } = require("../models");
exports.index = async (req, res) => {
  const listaUser = await db.user.findAll();
  res.send(listaUser);
};
const config = process.env;
exports.store = async (req, res) => {
  if (!req.body.nombrecompleto) {
    res.status(400).send({
      message: "El nombrecompleto es requerido",
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({
      message: "La email es requerido",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "La password es requerido",
    });
    return;
  }

  // check if user already exist
  // Validate if user exist in our database
  const { email, password } = req.body;
  const oldUser = await db.user.findOne({ where: { email: email } });

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }

  //Encrypt user password
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    nombrecompleto: req.body.nombrecompleto,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });
  const roles = await user.getRols();
  const listaroles = Array();
  roles.forEach((element) => {
    listaroles.push(element.rol);
  });
  const token = jwt.sign(
    { user_id: user._id, listaroles },
    "django-insecure-8n^vn52(ue3dv_o3^m0ktt1gic1=v$xluk5n#ggqm=(7aa&lk)",
    {
      expiresIn: "2h",
    }
  );

  await user.update({
    token: token,
  });
  await user.addRols(4);
  /* const result = await db.user.findOne({
    where: { id: user.id },
    include: 'rols',
  }); */
  res.send(user);
};
exports.update = async (req, res) => {
  if (!req.params.userid) {
    res.status(400).send({
      message: "El id de la userid es requerido",
    });
    return;
  }
  const user = await db.user.findByPk(req.params.userid);
  if (user == null) {
    res.status(404).send({ message: "Usuario no encontrada" });
    return;
  }
  if (!req.body.nombrecompleto) {
    res.status(400).send({
      message: "La edad es requerido",
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({
      message: "La edad es requerido",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "La fecha de nacimiento es requerido",
    });
    return;
  }
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  if (user.password == req.body.password) {
    await user.update({
      nombrecompleto: req.body.nombrecompleto,
      email: req.body.email,
    });
  }else {
    await user.update({
      nombrecompleto: req.body.nombrecompleto,
      email: req.body.email,
      password: encryptedPassword,
    });
  }
  

  res.send(user);
};
exports.delete = async (req, res) => {
  if (!req.params.userid) {
    res.status(400).send({
      message: "El id de la user es requerido",
    });
    return;
  }
  const user = await db.user.findByPk(req.params.userid);
  if (user == null) {
    res.status(404).send({ message: "user no encontrada" });
    return;
  }
  await user.destroy();
  res.send({});
};
exports.show = async (req, res) => {
  if (!req.params.userid) {
    res.status(400).send({
      message: "El id de la user es requerido",
    });
    return;
  }
  const user = await db.user.findByPk(req.params.userid, {include: "rols"});
  if (user == null) {
    res.status(404).send({ message: "user no encontrada" });
    return;
  }
  res.send(user);
};
exports.login = async (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "La email es requerido",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "La password de nacimiento es requerido",
    });
    return;
  }

  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await db.user.findOne({
      where: { email: email },
      include: {
        model: rol,
        through: {
          attributes: [],
        },
      },
    });

    /*    const result = await db.user.findOne({
      where: { id: user.id },
      include: 'rols',
    }); */

    if (user && (await bcrypt.compare(password, user.password))) {
      const roles = await user.getRols();
      const listaroles = Array();
      roles.forEach((element) => {
        listaroles.push(element.rol);
      });
      const token = jwt.sign(
        { user_id: user._id, listaroles },
        "django-insecure-8n^vn52(ue3dv_o3^m0ktt1gic1=v$xluk5n#ggqm=(7aa&lk)",
        {
          expiresIn: "2h",
        }
      );

      user.update({ token: token });
      //user.token = token;

      res.status(200).send({
        access: user.token,
        user,
      });
    } else {
      res.status(400).send({
        message: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Invalid Credentials",
    });
  }
  // Our register logic ends here
};

exports.loginSuper = async (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "La email es requerido",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "La password de nacimiento es requerido",
    });
    return;
  }

  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await db.user.findOne({
      where: { email: email },
      include: {
        model: rol,
        through: {
          attributes: [],
        },
      },
    });
    const roles = await user.getRols();

    const rolAutorizado = roles.find(
      (element) => element.rol === "Super Administrador"
    );
    if (!rolAutorizado) {
      return res
        .status(403)
        .json({ message: "No tiene el nivel correspondiente de rol" });
    }
    /*    const result = await db.user.findOne({
      where: { id: user.id },
      include: 'rols',
    }); */

    if (user && (await bcrypt.compare(password, user.password))) {
      const roles = await user.getRols();
      const listaroles = Array();
      roles.forEach((element) => {
        listaroles.push(element.rol);
      });
      const token = jwt.sign(
        { user_id: user._id, listaroles },
        "django-insecure-8n^vn52(ue3dv_o3^m0ktt1gic1=v$xluk5n#ggqm=(7aa&lk)",
        {
          expiresIn: "2h",
        }
      );

      user.update({ token: token });
      //user.token = token;

      res.status(200).send({
        access: user.token,
        user,
      });
    } else {
      res.status(400).send({
        message: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Invalid Credentials",
    });
  }
  // Our register logic ends here
};
