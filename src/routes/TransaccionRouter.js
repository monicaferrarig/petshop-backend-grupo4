const {Router} = require("express");
const transaccion_controller = require("../controllers/TransaccionController");
const transaccion_router = Router();

transaccion_router.post(  "/transaccion",transaccion_controller.crearTransaccion);

module.exports = transaccion_router;
