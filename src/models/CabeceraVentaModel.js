const {DataTypes} = require("sequelize");

const cabecera_venta_model = (conexion) => {
  return conexion.define(
    "cabeceraVentas",
    {
      cabeceraVenta_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      cabeceraVenta_fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      cabeceraVenta_total: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
      cabeceraVenta_igv: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
    },
    {
      tableName: "t_cabeceraVenta",
      timestamps: true,
    }
  );
};

module.exports = cabecera_venta_model;
