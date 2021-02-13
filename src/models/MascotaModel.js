const {DataTypes} = require("sequelize");

const mascota_model = (conexion) => {
  return conexion.define(
    "mascotas",
    {
      mascota_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      mascota_nombre: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      mascota_edad: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      mascota_genero: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
    },
    {
      tableName: "t_mascota",
      timestamps: true,
    }
  );
};
module.exports = mascota_model;
