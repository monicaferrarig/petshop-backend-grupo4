const {Sequelize} = require("sequelize");
//A. IMPORTACION DE LOS MODELOS
const cita_model = require("../models/CitaModel");
const historia_clinica_model = require("../models/HistoriaClinicaModel");
const imagen_model = require("../models/ImagenModel");
const mascota_model = require("../models/MascotaModel");
const raza_model = require("../models/RazaModel");
const tipo_model = require("../models/TipoModel");
const usuario_model = require("../models/UsuarioModel");
const vacuna_model = require("../models/VacunaModel");
const cabecera_venta_model = require("../models/CabeceraVentaModel");
const detalle_venta_model = require("../models/DetalleVentaModel");

//CONEXION BASE DE DATOS
const conexion = new Sequelize(
  "l6t72w9pilu436dg",
  "hrrgiffqk6xilzkv",
  "kjp5dvdyci5tlb22",
  {
    host: "hwr4wkxs079mtb19.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: "3306",
    dialect: "mysql",
    timezone: "-05:00",
    logging: false,
    dialectOptions: {
      dateStrings: true,
    },
  }
);

// const conexion = new Sequelize("petshop_backend", "root", "mysql", {
//   host: "127.0.0.1",
//   port: "3306",
//   dialect: "mysql",
//   timezone: "-05:00",
//   logging: false,
//   dialectOptions: {
//     dateStrings: true,
//   },
// });
//B. CREACION TABLAS EN LA BASE DE DATOS
const Cita = cita_model(conexion);
const HistoriaClinica = historia_clinica_model(conexion);
const Imagen = imagen_model(conexion);
const Mascota = mascota_model(conexion);
const Raza = raza_model(conexion);
const Tipo = tipo_model(conexion);
const Usuario = usuario_model(conexion);
const Vacuna = vacuna_model(conexion);
const CabeceraVenta = cabecera_venta_model(conexion);
const DetalleVenta = detalle_venta_model(conexion);

//C. CREACIÓN DE LAS RELACIONES
//t_usuario
Usuario.hasMany(Mascota, {foreignKey: {name: "usuario_dni", allowNull: false}});
Mascota.belongsTo(Usuario, {foreignKey: "usuario_dni"});

Usuario.hasMany(Cita, {foreignKey: {name: "usuario_dni", allowNull: false}});
Cita.belongsTo(Usuario, {foreignKey: "usuario_dni"});

Usuario.hasMany(CabeceraVenta, {
  foreignKey: {name: "usuario_dni", allowNull: false},
});
CabeceraVenta.belongsTo(Usuario, {foreignKey: "usuario_dni"});

//t_vacuna

Vacuna.hasMany(DetalleVenta, {
  foreignKey: {name: "vacuna_id", allowNull: false},
});
DetalleVenta.belongsTo(Vacuna, {foreignKey: "vacuna_id"});

Vacuna.hasMany(Cita, {foreignKey: {name: "vacuna_id"}});
Cita.belongsTo(Vacuna, {foreignKey: "vacuna_id"});

//t_cabeceraVenta
CabeceraVenta.hasMany(DetalleVenta, {
  foreignKey: {name: "cabeceraVenta_id", allowNull: false},
});
DetalleVenta.belongsTo(CabeceraVenta, {foreignKey: "cabeceraVenta_id"});

//t_mascota
Mascota.hasOne(HistoriaClinica, {
  foreignKey: {name: "mascota_id", allowNull: false, unique: true},
});
HistoriaClinica.belongsTo(Mascota, {foreignKey: "mascota_id"});

//t_historiaClinica
HistoriaClinica.hasMany(Cita, {
  foreignKey: {name: "historiaClinica_id", allowNull: false},
});
Cita.belongsTo(HistoriaClinica, {foreignKey: "historiaClinica_id"});

//t_raza
Raza.hasMany(Mascota, {foreignKey: {name: "raza_id", allowNull: false}});
Mascota.belongsTo(Raza, {foreignKey: "raza_id"});

//t_tipo
Tipo.hasMany(Raza, {foreignKey: {name: "tipo_id", allowNull: false}});
Raza.belongsTo(Tipo, {foreignKey: "tipo_id"});

//t_imagen
Imagen.hasMany(Mascota, {foreignKey: {name: "imagen_id"}});
Mascota.belongsTo(Imagen, {foreignKey: "imagen_id"});

Imagen.hasMany(Usuario, {foreignKey: {name: "imagen_id"}});
Usuario.belongsTo(Imagen, {foreignKey: "imagen_id"});

//D. EXPORTACION DE LA CONEXION Y TABLAS
module.exports = {
  conexion: conexion,
  Cita,
  HistoriaClinica,
  Imagen,
  Mascota,
  Raza,
  Tipo,
  Usuario,
  Vacuna,
  CabeceraVenta,
  DetalleVenta,
};
