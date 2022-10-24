module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        nombrecompleto: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING,
            allowNull: true
        },

    }, {
    });
    return User;
}