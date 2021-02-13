const historiaClinica_controller = require("../controllers/HistoriaClinicaController");
const {Router} = require("express");
const historiaClinica_router = Router();

historiaClinica_router.post(
  "/crearHistoriaClinica",
  historiaClinica_controller.crearHistoriaClinica
);

module.exports = historiaClinica_router;
