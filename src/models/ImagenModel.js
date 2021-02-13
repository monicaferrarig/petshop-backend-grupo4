const {DataTypes} = require ('sequelize');

const imagen_model = (conexion)=>{
    return conexion.define('foto', {
        imagen_id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER
        },
        imagen_url:{
            type:DataTypes.TEXT,
            allowNull: false
        }
    },{
        tableName: 't_imagen',
        timestamps: false
    })
}
module.exports=imagen_model;