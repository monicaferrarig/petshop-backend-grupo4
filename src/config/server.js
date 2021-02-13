const express = require("express");
const bodyParser = require("body-parser");
const {conexion} = require("./Sequelize");
const vacuna_router = require("../routes/VacunaRouter");
const usuario_router = require("../routes/UsuarioRouter");
const mascota_router = require("../routes/MascotaRouter");
const tipo_router = require("../routes/TipoRouter");
const raza_router = require("../routes/RazaRouter");
const transaccion_router = require("../routes/TransaccionRouter");
const historiaClinica_router = require("../routes/HistoriaClinicaRouter");
const cita_router = require("../routes/CitaRouter");
const imagen_router = require("../routes/ImagenRouter");

//DOCUMENTACION EN SWAGGER
const swaggerUi = require("swagger-ui-express");
const documentacion = require("../../../PetShop-BackEnd-Grupo4.postman_collection.json-Swagger20.json");

module.exports = class Server {
  constructor() {
    this.app = express();
    this.puerto = process.env.PORT || 5000;
    this.CORS();
    this.configurarBodyParser();
    this.rutas();
  }
  CORS() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); //el dominio que va a usar mi back (es el front)
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      next();
    });
  }
  configurarBodyParser() {
    this.app.use(bodyParser.json());
  }
  rutas() {
    this.app.get("/", (req, res) => {
      res.status(200).send("La API funciona correctamente 🍖");
    });
    this.app.use("", vacuna_router);
    this.app.use("", usuario_router);
    this.app.use("", mascota_router);
    this.app.use("", tipo_router);
    this.app.use("", raza_router);
    this.app.use("", transaccion_router);
    this.app.use("", historiaClinica_router);
    this.app.use("", cita_router);
    this.app.use("", imagen_router);
    this.app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(documentacion));
  }
  start() {
    this.app.listen(this.puerto, () => {
      console.log(
        `Servidor corriendo exitosamente 🍖 en el puerto ${this.puerto}`
      );
      //conexion.sync({force:true})
      //conexion.sync({alter:true})
      conexion
        .sync()
        .then(() => {
          console.log("Base de datos sincronizada exitosamente 🍖");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
};
