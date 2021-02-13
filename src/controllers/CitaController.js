const {
  Cita,
  Usuario,
  HistoriaClinica,
  Mascota,
} = require("../config/Sequelize");
const {Op} = require("sequelize");

const crearCita = async (req, res) => {
  let cuerpo = req.body;
  try {
    let nuevaCita = await Cita.create(cuerpo);
    return res.json({
      ok: true,
      content: nuevaCita,
      message: "✔ Cita creada exitosamente",
    });
  } catch (error) {
    return res.json({
      ok: false,
      content: error,
      message: "✖ Hubo un error al crear la Cita",
    });
  }
};

const buscarCitaPorFecha = async (req, res) => {
  let {fecha, fech_in, fech_fin} = req.query;
  try {
    let citas;
    if (fecha) {
      citas = await Cita.findAll({
        where: {
          cita_fecha: fecha,
        },

        include: {
          model: Usuario,
          attributes: {
            exclude: [
              "usuario_fecha_nacimiento",
              "usuario_tipo",
              "usuario_hash",
              "usuario_salt",
              "createdAt",
              "updatedAt",
              "imagen_id",
            ],
          },
        },
      });
    } else if (fech_in && fech_fin) {
      citas = await Cita.findAll({
        where: {
          cita_fecha: {
            [Op.between]: [fech_in, fech_fin],
          },
        },
        include: {
          model: Usuario,
          attributes: {
            exclude: [
              "usuario_fecha_nacimiento",
              "usuario_tipo",
              "usuario_hash",
              "usuario_salt",
              "createdAt",
              "updatedAt",
              "imagen_id",
            ],
          },
        },
      });
    }
    return res.json({
      ok: true,
      content: citas,
      message: null,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      content: error,
      message: "Error al hacer la busqueda",
    });
  }

  // let {fecha_inicio, fecha_final} = req.query;
  // try {
  //   if (fecha_inicio && fecha_final) {
  //     let citas = await Cita.findAll({
  //       where: {
  //         cita_fecha: {
  //           [Op.between]: [fecha_inicio, fecha_final],
  //         },
  //       },
  //       include: {
  //         model: Usuario,
  //         attributes: {
  //           include: [
  //             "usuario_dni",
  //             "usuario_nombre",
  //             "usuario_apellido",
  //             "usuario_celular",
  //           ],
  //         },
  //       },
  //       include: {
  //         model: HistoriaClinica,
  //         attributes: {
  //           include: ["historiaClinica_id"],
  //         },
  //         include: {
  //           model: Mascota,
  //           atributes: {
  //             include: ["mascota_nombre", "mascota_raza"],
  //           },
  //         },
  //       },
  //     });
  //     return res.json({
  //       ok: true,
  //       content: citas,
  //       message: `Citas programadas entre ${fecha_inicio} y ${fecha_final}`,
  //     });
  //   } else {
  //     return res.json({
  //       ok: false,
  //       content: null,
  //       message: "Falta indicar el rango de fechas a buscar",
  //     });
  //   }
  // } catch (error) {
  //   return res.status(500).json({
  //     ok: false,
  //     content: error,
  //     message: "Error al hacer la busqueda",
  //   });
  // }
};

module.exports = {
  crearCita,
  buscarCitaPorFecha,
};
