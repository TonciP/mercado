module.exports = app => {
    const controller = require('../controller/user.controller');
    let router = require('express').Router();
    const authSuper = require("../middleware/authSuper");

    // solo usuarios superadmin
    router.get('/',authSuper, controller.index);
    router.post('/',  controller.store);
    router.put('/:userid',authSuper, controller.update);
    router.get('/:userid',authSuper,  controller.show);
    router.delete('/:userid',authSuper, controller.delete);

    router.post('/login', controller.login);
    router.post('/loginSuper', controller.loginSuper);

    app.use('/api/usuario', router);
}