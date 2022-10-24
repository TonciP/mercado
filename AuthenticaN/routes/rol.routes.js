module.exports = app => {
    const controller = require('../controller/rol.controller');
    let router = require('express').Router();
    const authSuper = require("../middleware/authSuper");

    router.get('/', authSuper, controller.index);
    // agregar roles a los usuarios
    router.post('/usuario/:id',authSuper, controller.storeRol);
    // definir solo un rol al usuario
    router.post('/usuarior/:id',authSuper, controller.storeRols);

    app.use('/api/rol', router);
}