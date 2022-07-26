module.exports = app => {

    const clientes = require("../controller/clientes.controller.js");
    var router = require("express").Router();

    app.use("/api/clientes", router);

    router.post("/", clientes.create);

    router.get("/", clientes.getAll);

}