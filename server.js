const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
}

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/model");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Aplicación de clientes en ejecución" });
});

require("./app/routes/clientes.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});