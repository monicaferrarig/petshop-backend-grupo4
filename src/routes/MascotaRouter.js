const mascota_controller = require('../controllers/MascotaController');
const {Router} = require('express');
const mascota_router = Router();
const {validarPropietario} = require('../utils/Validador')

mascota_router.post("/registrarMascota",validarPropietario, mascota_controller.registrarMascota);

module.exports = mascota_router;