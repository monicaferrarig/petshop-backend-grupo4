const {
  conexion,
  CabeceraVenta,
  DetalleVenta,
  Usuario,
  Vacuna,
} = require("../config/sequelize");

const crearTransaccion = async (req, res) => {
  const t = await conexion.transaction();
  let {
    cabeceraVenta_fecha,
    cabeceraVenta_total,
    cabeceraVenta_igv,
    usuario_dni,
    vacunas,
  } = req.body;
  console.log(req.body);
  try {
    let usuarioEncontrado = await Usuario.findByPk(usuario_dni);
    let vacunaEncontrada = true;
    for (const key in vacunas) {
      let vacuna = await Vacuna.findOne({
        where: {
          vacuna_id: vacunas[key].vacuna,
        },
      });
      let cantidad_actual = vacuna.vacuna_cantidad;
      let cantidad_solicitada = vacunas[key].cantidad;

      // 1.Validando cantidad y existencia de usuario

      if (vacuna === null || cantidad_actual < cantidad_solicitada) {
        vacunaEncontrada = false;
        break;
      }
    }
    if (vacunaEncontrada === false || usuarioEncontrado === null) {
      // console.log(vacunaEncontrada);
      // console.log(usuarioEncontrado);
      return res.status(400).json({
        ok: false,
        message: "Vacuna o Usuario incorrectos.",
        content: null,
      });
    }

    //   2. Creando la cabecera
    let crearCabecera = await CabeceraVenta.create(
      {
        cabeceraVenta_fecha: cabeceraVenta_fecha,
        cabeceraVenta_total: cabeceraVenta_total,
        cabeceraVenta_igv: cabeceraVenta_igv,
        usuario_dni: usuarioEncontrado.usuario_dni,
      },
      {transaction: t}
    );
    // 3. Creando el detalle
    for (const i in vacunas) {
      let vacuna = await Vacuna.findByPk(vacunas[i].vacuna);
      // 4. Sacar los cálculos
      await DetalleVenta.create(
        {
          detalleVenta_cantidad: vacunas[i].detalleVentaCantidad,
          detalleVenta_precio: vacunas[i].detalleVentaPrecio,
          detalleVenta_total:
            vacunas[i].detalleVentaPrecio * vacunas[i].detalleVentaCantidad,
          vacuna_id: vacuna.vacuna_id,
          cabeceraVenta_id: crearCabecera.cabeceraVenta_id,
        },
        {transaction: t}
      );
      // 5. Restando la cantidad
      vacuna.vacuna_cantidad =
        vacuna.vacuna_cantidad - vacunas[i].detalleVentaCantidad;
      console.log(vacuna.vacuna_cantidad);
      console.log(vacunas[i].detalleVentaCantidad);
      vacuna.save({transaction: t});
    }
    //   6. Devolviendo el resultado
    await t.commit();
    return res.status(201).json({
      ok: true,
      content: crearCabecera,
      message: "Transaccion realizada correctamente.",
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      ok: false,
      content: error,
      message: "Hubo un error al realizar la venta",
    });
  }
};

module.exports = {
  crearTransaccion,
};
