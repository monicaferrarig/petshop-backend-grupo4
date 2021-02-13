const {Mascota, Usuario} = require ('../config/Sequelize');

const registrarMascota = async (req,res) => {
    let cuerpo = req.body;
    try {
        let nuevaMascota = await Mascota.create(cuerpo);
        return res.json({
            ok: true,
            content: nuevaMascota,
            message: "✔ Mascota creada exitosamente"
        });
    } catch(error){
        return res.json({
            ok: false,
            content: error,
            message: "✖ Hubo un error al crear a la mascota"
        });
    }
};


module.exports = {
    registrarMascota,
};
