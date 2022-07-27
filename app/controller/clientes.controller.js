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

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condicion = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;
    Cliente.findAll({ where: condicion })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algo salió mal"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: "No se puede encontrar el cliente"
            })
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Algo salió mal"
        });
    });
}

exports.findAllActive = (req, res) => {
    Cliente.findAll({ where: { estado: true } })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algo salió mal"
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Cliente.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Cliente actualizado correctamente"
            });
        } else {
            res.send({
                message: `No se pudo actualizar el cliente con el id: ${id}`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algo salió mal"
        });
    });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Cliente.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Cliente eliminado correctamente"
            });
        } else {
            res.send({
                message: `No se pudo eliminar el cliente con el id: ${id}`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algo salió mal"
        });
    });
}

exports.deleteAll = (req, res) => {
    Cliente.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({
            message: `Se eliminaron ${nums} clientes`
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algo salió mal"
        });
    });
}