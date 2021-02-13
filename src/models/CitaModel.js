const {DataTypes} = require("sequelize");

const cita_model = (conexion) => {
  return conexion.define(
    "citas",
    {
      cita_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      cita_fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      cita_descripcion: {
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: "t_cita",
      timestamps: false,
    }
  );
};
module.exports = cita_model;
