const {Raza} = require ('../config/Sequelize');

const registrarMascotaRaza = async (req,res) => {
    let cuerpo = req.body;
    try {
        let nuevaRaza = await Raza.create(cuerpo);
        return res.json({
            ok: true,
            content: nuevaRaza,
            message: "✔ Raza de mascota creada exitosamente"
        });
    } catch(error){
        return res.json({
            ok: false,
            content: error,
            message: "✖ Hubo un error al crear la raza de la mascota"
        });
    }
};
module.exports = {
    registrarMascotaRaza,
};
