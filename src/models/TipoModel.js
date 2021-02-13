const {DataTypes} = require("sequelize");

const tipo_model = (conexion) => {
    return conexion.define('tipos', {
        tipo_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        tipo_nombre: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        tipo_descripcion: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    }, {
        tableName: 't_tipo',
        timestamps: false
    })
}
module.exports = tipo_model;