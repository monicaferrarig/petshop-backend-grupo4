const {HistoriaClinica} = require("../config/Sequelize");
const {Op} = require("sequelize");

const crearHistoriaClinica = async (req, res) => {
  let cuerpo = req.body;
  try {
    let nuevaHistoriaClinica = await HistoriaClinica.create(cuerpo);
    return res.json({
      ok: true,
      content: nuevaHistoriaClinica,
      message: "✔ Historia creada exitosamente",
    });
  } catch (error) {
    return res.json({
      ok: false,
      content: error,
      message: "✖ Hubo un error al crear la Historia",
    });
  }
};

module.exports = {
  crearHistoriaClinica,
};
