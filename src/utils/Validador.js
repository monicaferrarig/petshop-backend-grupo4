const jwt = require("jsonwebtoken");

const verificarToken = (token) => {
    try {
        let password = process.env.JWT_SECRET || "petshop4";
        let resultado = jwt.verify(token, password, { algorithm: "RS256" });
        return resultado;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const validacionMultiple = (opcion, authorization, res, next) => {
    if (authorization) {
        let token = authorization.split(" ")[1];
        let respuesta = verificarToken(token);
        switch (opcion) {
        case 1:
            if (respuesta && respuesta.usuario_tipo === 1) //SE VALIDA SI ES ADMINISTRADOR
            {
                return next();
            }
            break;
        case 2:
            if (respuesta && (respuesta.usuario_tipo === 1 || respuesta.usuario_tipo === 3)) //SE VALIDA SI ES ADMINISTRADOR O VETERINARIO
            {
            return next();
            }
            break;
        case 3:
            if (respuesta && (respuesta.usuario_tipo === 1 || respuesta.usuario_tipo === 2) ) //SE VALIDA SI ES ADMINISTRADOR O PROPIETARIO
            {
            return next();
            }
            break;
        case 4:
            if (respuesta && respuesta.usuario_tipo === 2) //SE VALIDA SI ES PROPIETARIO
            {
                return next();
            }
            break;    
        default:
            break;
        }
        return res.status(401).json({
        ok: false,
        content: "✖ No estas autorizado para realizar esta solicitud",
        });
    } else {
        return res.status(401).json({
            ok: false,
            message: "✖ Necesitas estar autenticado para realizar esta peticion",
        });
    }
};
//opcion:1 (ADM)
const validarAdministrador = (req, res, next) => {
    return validacionMultiple(1, req.headers.authorization, res, next);
};
//opcion:2
const validarAdministradorOVeterinario = (req, res, next) => {
    return validacionMultiple(2, req.headers.authorization, res, next);
};
//opcion:3
const validarAdministradorOPropietario = (req, res, next) => {
    return validacionMultiple(3, req.headers.authorization, res, next);
};
//opcion:4
const validarPropietario = (req, res, next) => {
    return validacionMultiple(4, req.headers.authorization, res, next);
};

module.exports = {
    validacionMultiple,
    validarAdministrador,
    validarAdministradorOVeterinario,
    validarAdministradorOPropietario,
    validarPropietario,
};