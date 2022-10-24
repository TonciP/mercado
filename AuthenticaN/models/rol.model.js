module.exports = (sequelize, Sequelize) => {
    const Rol = sequelize.define('rol', {
        rol: {
            type: Sequelize.STRING,
            allowNull: false
        },

    });
    return Rol;
}