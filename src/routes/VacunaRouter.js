const vacuna_controller = require("../controllers/VacunaController");
const {Router} = require("express");

module.exports = vacuna_router = Router();

vacuna_router.post("/vacuna", vacuna_controller.crearVacuna);
vacuna_router.get("/vacuna", vacuna_controller.mostrarVacunas);
vacuna_router.get(
  "/vacuna/buscar/:nombre",
  vacuna_controller.mostrarVacunaPorNombre
);
vacuna_router.delete("/vacuna/:id", vacuna_controller.eliminarVacunaPorId);
vacuna_router.put("/vacuna/:id", vacuna_controller.editarVacunaPorId);
