const raza_controller = require('../controllers/RazaController');
const {Router} = require('express');
const raza_router = Router();
const {validarAdministradorOVeterinario} = require ('../utils/Validador');

raza_router.post("/mascota/registrarRaza",validarAdministradorOVeterinario, raza_controller.registrarMascotaRaza);

module.exports = raza_router;