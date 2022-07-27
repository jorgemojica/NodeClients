module.exports = app => {

    const clientes = require("../controller/clientes.controller.js");
    var router = require("express").Router();

    app.use("/api/clientes", router);

    router.post("/", clientes.create);

    router.get("/", clientes.findAll);

    router.get("/:id", clientes.findOne);

    router.get('/estado/activo', clientes.findAllActive);

    router.put("/:id", clientes.update);

    router.delete("/:id", clientes.delete);

    router.delete("/", clientes.deleteAll);

}