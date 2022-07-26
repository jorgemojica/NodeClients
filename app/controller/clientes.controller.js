const model = require("../model");
const Cliente = model.clientes;
const Op = model.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.nombre || !req.body.telefono || !req.body.edad) {
        res.status(400).send({
            message: "Se deben completar todos los campos"
        });
        return;
    }

    const cliente = {
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        edad: req.body.edad,
        estado: req.body.estado ? req.body.estado : false
    };

    Cliente.create(cliente).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Algo salió mal"
        });
    });
};