const {Storage} = require("@google-cloud/storage");
// Inicializo mi objeto de Firebase para pder conectarme con mi Bucket
const credenciales = {
  projectId: "backend-petshop-imagen",
  keyFilename: "./credenciales_firebase_petshop.json",
};
const storage = new Storage(credenciales);
// Se crea la variable bucket que se usa como referencia al link del storage
const bucket = storage.bucket("backend-petshop-imagen.appspot.com");

const subirArchivo = (archivo) => {
  return new Promise((resolve, reject) => {
    if (!archivo) {
      reject("No se econtró el archivo.");
    }
    // Modificamos el nombre original para prevenir que el usuario pueda sobreescribir un archivo con el mismo nombre
    const nuevoNombre = `${archivo.originalname}_${Date.now()}`;
    // comenzamos a cargar nuestro archivo con el nuevo nombre pero aun no se sube a Firebase
    const fileUpload = bucket.file(nuevoNombre);
    // agregamos configuracion adicional de nuestro archivo a subir como su metadata
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: archivo.mimetype,
      },
    });
    // si hay un error al momento de subir el archivo ingresaremos a su estado "error"
    blobStream.on("error", (error) => {
      reject(`Hubo un error al subir el archivo: ${error}`);
    });
    blobStream.on("finish", () => {
      fileUpload
        .getSignedUrl({
          action: "read",
          expires: "12-12-2021", // MM-DD-YYYY
        })
        .then((link) => resolve(link))
        .catch((error) => reject(`Error al devolver el link: ${error}`));
    });
    // Acá es donde se sube el archivo
    blobStream.end(archivo.buffer);
  });
};

module.exports = {
  subirArchivo,
};
