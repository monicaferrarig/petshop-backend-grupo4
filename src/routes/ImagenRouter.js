const {Router} = require("express");
const Multer = require("multer");
const imagen_controller = require("../controllers/ImagenController");
const imagen_router = Router();
// Se le da atributos que guarden en la memory storage
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

imagen_router.post(
  "/subirImagen",
  multer.single("imagen"),
  imagen_controller.subirImagen
);

// Rutas
// {{url}}/subirImagen?modelo=usuario&id=11111111
// {{url}}/subirImagen?modelo=mascota&id=1
module.exports = imagen_router;
