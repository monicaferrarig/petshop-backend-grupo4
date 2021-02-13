const {subirArchivo} = require("../utils/manejoArchivoFirebase");
const {Imagen, Usuario, Mascota} = require("../config/sequelize");

const subirImagen = async (req, res) => {
  try {
    let {modelo, id} = req.query;
    if (modelo !== "usuario" && modelo !== "mascota") {
      return res.status(400).json({
        ok: false,
        message: "Modelo no definido",
        conten: null,
      });
    }

    let resultado = await subirArchivo(req.file);
    let nuevaImagen = await Imagen.create({
      imagen_url: resultado[0],
    });
    if (modelo === "usuario") {
      let usuario = await Usuario.findByPk(id);
      usuario.imagen_id = nuevaImagen.imagen_id;
      usuario.save();

      return res.status(201).json({
        ok: true,
        content: nuevaImagen.imagen_id,
        message: "La imagen del usuario se guardó correctamente ✔ ",
      });
    } else if (modelo === "mascota") {
      let mascota = await Mascota.findByPk(id);
      mascota.imagen_id = nuevaImagen.imagen_id;
      mascota.save();
      return res.status(201).json({
        ok: true,
        content: nuevaImagen.imagen_id,
        message: "La imagen de la mascota se guardó correctamente ✔",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      content: error,
      message: "Hubo un error al subir el archivo.",
    });
  }
};

module.exports = {
  subirImagen,
};
