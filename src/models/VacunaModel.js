const {DataTypes} = require("sequelize");

const vacuna_model = (conexion) => {
  return conexion.define(
    "vacunas",
    {
      vacuna_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      vacuna_nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      vacuna_precio: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        validate: {
          min: 10,
        },
      },
      vacuna_descuento: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vacuna_descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vacuna_marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vacuna_cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vacuna_fechaVen: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "t_vacuna",
      timestamps: true,
    }
  );
};

module.exports = vacuna_model;
