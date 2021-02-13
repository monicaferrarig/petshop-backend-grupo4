const {DataTypes} = require("sequelize");

const detalle_venta_model = (conexion) => {
  return conexion.define(
    "detalleVentas",
    {
      detalleVenta_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      detalleVenta_cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      detalleVenta_precio: {
        type: DataTypes.DECIMAL(6, 2),
        allowNUll: false,
      },
      detalleVenta_total: {
        type: DataTypes.DECIMAL(6, 2),
        allowNUll: false,
      },
    },
    {
      tableName: "t_detalleVenta",
      timestamps: true,
    }
  );
};
module.exports = detalle_venta_model;
