const {DataTypes} = require("sequelize");

const historia_clinica_model = (conexion) => {
  return conexion.define(
    "historiasClinicas",
    {
      historiaClinica_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      historiaClinica_fechaApertura: {
        type: DataTypes.DATEONLY,
      },
      historiaClinica_estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "t_historiaClinica",
      timestamps: true,
    }
  );
};
module.exports = historia_clinica_model;
