const {Vacuna} = require("../config/sequelize");
const {Op} = require("sequelize"); //operadores de sequelize

const crearVacuna = async (req, res) => {
  let cuerpo = req.body;
  try {
    let nuevaVacuna = await Vacuna.create(cuerpo);
    return res.json({
      ok: true,
      content: nuevaVacuna,
      message: "✔ Vacuna creada exitosamente",
    });
  } catch (error) {
    return res.json({
      ok: false,
      content: error,
      message: "✖ Hubo un error al crear la vacuna",
    });
  }
};

const editarVacunaPorId = (req, res) => {
  let {id} = req.params;
  Vacuna.update(req.body, {
    where: {
      vacuna_id: id,
    },
  })
    .then(async (resultado) => {
      if (resultado[0] !== 0) {
        let vacuna = await Vacuna.findOne({where: {vacuna_id: id}});
        return res.status(201).json({
          ok: true,
          content: vacuna,
          message: "Se actualizó exitosamente la vacuna.",
        });
      } else {
        return res.json({
          ok: false,
          content: null,
          message: "No se encontró vacuna a actualizar",
        });
      }
    })
    .catch((error) =>
      res.status(500).json({
        ok: false,
        content: null,
        message: "Hubo un error al actualizar la vacuna.",
      })
    );
};

const mostrarVacunas = (req, res) => {
  Vacuna.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((vacunas) => {
      return res.json({
        ok: true,
        content: vacunas,
        message: "✔ Relacion de TODAS LAS VACUNAS",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        ok: false,
        content: error,
        message: "✖ Hubo un error al devolver las vacunas",
      });
    });
};
const mostrarVacunaPorNombre = async (req, res) => {
  let {nombre} = req.params;
  try {
    let vacunas = await Vacuna.findAll({
      where: {
        vacuna_nombre: {
          [Op.substring]: nombre,
        },
      },
      attributes: {
        exclude: ["vacuna_descuento", "createdAt", "updatedAt"],
      },
    });
    return vacunas
      ? res.json({
          ok: true,
          content: vacunas,
          message: "✔ Listado de vacunas encontradas",
        }) //REVISAR
      : res.status(404).json({
          ok: true,
          content: vacunas,
          message: "✖ No hay vacunas con esos parámetros de busqueda",
        });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      content: error,
      message: "✖ Hubo un error al buscar las vacunas",
    });
  }
};
const eliminarVacunaPorId = async (req, res) => {
  let {id} = req.params;
  try {
    let vacunas = await Vacuna.destroy({
      where: {
        vacuna_id: id,
      },
    });
    return vacunas === 1
      ? res.json({
          ok: true,
          content: vacunas,
          message: `✔ La vacuna con el Id:${id} se eliminó correctamente`,
        })
      : res.status(404).json({
          ok: false,
          content: null,
          message: `✖ No se encontró la vacuna con el Id:${id}`,
        });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      content: error,
      message: "✖ Hubo un error al eliminar la vacuna",
    });
  }
};

module.exports = {
  crearVacuna,
  mostrarVacunas,
  mostrarVacunaPorNombre,
  eliminarVacunaPorId,
  editarVacunaPorId,
};
