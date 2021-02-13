const {Tipo} = require ('../config/Sequelize');

const registrarMascotaTipo = async (req,res) => {
    let cuerpo = req.body;
    try {
        let nuevoTipo = await Tipo.create(cuerpo);
        return res.json({
            ok: true,
            content: nuevoTipo,
            message: "✔ Tipo de mascota creado exitosamente"
        });
    } catch(error){
        return res.json({
            ok: false,
            content: error,
            message: "✖ Hubo un error al crear al tipo de mascota"
        });
    }
};
module.exports = {
    registrarMascotaTipo,
};
