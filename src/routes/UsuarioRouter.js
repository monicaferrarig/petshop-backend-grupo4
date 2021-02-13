const {Router} = require("express");
const usuario_controller = require ('../controllers/UsuarioController');
const {validarAdministradorOVeterinario, validarAdministrador} = require ('../utils/Validador');
const usuario_router = Router();

usuario_router.post("/registrar", usuario_controller.registrarUsuario);
usuario_router.post("/login", usuario_controller.login);
usuario_router.get("/usuarioDNI/:dni", validarAdministradorOVeterinario , usuario_controller.devolverUsuarioPorDni);
usuario_router.get("/usuarioTipo/:tipo", validarAdministrador, usuario_controller.devolverUsuarioPorTipo);
usuario_router.get("/mostrarMascotas/:dni", usuario_controller.mostrarMascotasPorDni);


module.exports = usuario_router;