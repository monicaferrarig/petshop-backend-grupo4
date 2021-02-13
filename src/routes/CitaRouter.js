const cita_controller  = require('../controllers/CitaController');
const {Router} = require('express');
const cita_router = Router();

cita_router.post("/cita", cita_controller.crearCita);
cita_router.get("/cita/buscar", cita_controller.buscarCitaPorFecha);


module.exports = cita_router;