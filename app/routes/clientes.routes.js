module.exports = app => {

    const clientes = require("../controller/clientes.controller.js");
    var router = require("express").Router();

    router.post("/", clientes.create);

    app.use("/api/clientes", router);

}