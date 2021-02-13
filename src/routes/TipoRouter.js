const tipo_controller = require('../controllers/TipoController');
const {Router} = require('express');
const tipo_router = Router();
const {validarAdministradorOVeterinario} = require ('../utils/Validador');

tipo_router.post("/mascota/registrarTipo", validarAdministradorOVeterinario, tipo_controller.registrarMascotaTipo);

module.exports = tipo_router;