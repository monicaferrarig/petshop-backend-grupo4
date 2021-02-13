const {DataTypes} = require("sequelize");

const raza_model = (conexion) => {
    return conexion.define('razas', {
        raza_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        raza_nombre: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
    }, {
        tableName: 't_raza',
        timestamps: false
    })
}
module.exports = raza_model;