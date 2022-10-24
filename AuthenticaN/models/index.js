const dbConfig = require("../config/db.config");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.personas = require("./persona.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.rol = require("./rol.model")(sequelize, Sequelize);

db.user.belongsToMany(db.rol, { through: 'user_rol' });


module.exports = db;
