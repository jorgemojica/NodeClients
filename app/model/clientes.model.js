module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        nombre: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        edad: {
            type: Sequelize.INTEGER
        },
        estado: {
            type: Sequelize.BOOLEAN
        }
    });
    return Cliente;
};