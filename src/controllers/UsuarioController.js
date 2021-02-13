const {Usuario, Imagen, Mascota} = require ('../config/Sequelize');
/*ENVIAR POSTMAN
Tipo 1: ADMINISTRADOR
Tipo 2: PROPIETARIO MASCOTA
Tipo 3: VETERINARIO
*/
const registrarUsuario = async (req,res) => {
    try {
       let nuevoUsuario = Usuario.build(req.body);
        nuevoUsuario.setSaltAndHash(req.body.password);
        //aqui se manda a la bd
        await nuevoUsuario.save();
        let token = nuevoUsuario.generarJWT();
        return res.status(201).json({
            ok:true,
            content: token
    });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            content: error,
            message: '✖ Hubo un error al crear el usuario'
        });
    };
};

const login = async (req,res) => {
    let usuario = await Usuario.findOne({
        where: {
            usuario_correo: req.body.usuario_correo
        }
    });
    if (usuario) { 
        let resultado = usuario.validarPassword(req.body.password);
        if (resultado === true) {
            return res.json({
                ok:true,
                content: usuario.generarJWT(),
            });
        } 
    } 
        return res.status (400).json({
            ok: false,
            content: null,
            message: "✖ Usuario o contraseña incorrecta"
        });
    
};

const devolverUsuarioPorDni = (req,res) => {
    let {dni} = req.params
    Usuario.findOne({
        where: {
            usuario_dni:dni
        },
        attributes: {
            exclude: ["usuario_hash", "usuario_salt", "imagen_id", "createdAt", "updatedAt"],
        },      
        include: {
            model: Imagen,
            attributes:{include: ["imagen_url"]}
        }
    
  }).then((usuario)=>{
    return usuario ?
    res.json({
        ok:true,
        content:usuario,
        message: `Datos del usuario con DNI: ${dni}`
    }):
    res.status(404).json({
        ok:true,
        content:usuario,
        message:`No hay usuario con el DNI: ${dni}`
    })
}).catch((error)=>{
    return res.status(500).json({
        ok: false, 
        content: error, 
        message: 'Hubo un error al buscar el usuario'
    })
})
};

const devolverUsuarioPorTipo = (req,res) => {
    let {tipo} = req.params
    Usuario.findAll({
        where: {
            usuario_tipo:tipo
        },
        attributes: {
            exclude: ["usuario_hash", "usuario_salt", "imagen_id", "createdAt", "updatedAt"],
        },      
}).then((usuario)=>{
    if(tipo >= 1 && tipo <= 3){
        res.json({
            ok:true,
            content:usuario,
            message:`Relación de todos los usuarios del Tipo ${tipo} `
        }) 
    }else{
        res.status(404).json({
            ok:false,
            content:usuario,
            message:`✖ No existen usuarios con el Tipo ${tipo} / Los Tipos validos son => 1:ADMINISTRADOR 2:PROPIETARIO 3:VETERINARIO`
        })
    }
    return usuario
}).catch((error)=>{
    return res.status(500).json({
        ok: false, 
        content: error, 
        message: `Hubo un error al buscar los usuarios`
    })
})
};
const mostrarMascotasPorDni = (req,res) => {
    let {dni} = req.params
    Usuario.findAll({
        where: {
            usuario_dni:dni
        },
    attributes: {
        include: ["usuario_dni","usuario_nombre","usuario_apellido"],
    },
    include: {
        model: Mascota,
        attributes: {include: ["mascota_nombre", "mascota_raza", "mascota_edad","imagen_url"]},
    }

}).then((usuario)=>{
    return usuario ?
    res.json({
        ok:true,
        content:usuario,
        message: `Mascotas del usuario con DNI: ${dni}`
    }):
    res.status(404).json({
        ok:true,
        content:usuario,
        message:`No hay usuario con el DNI: ${dni}`
    })
}).catch((error)=>{
    return res.status(500).json({
        ok: false, 
        content: error, 
        message: 'Hubo un error al buscar el usuario y sus mascotas'
    })
})
};

module.exports = {
    registrarUsuario,
    login,
    devolverUsuarioPorDni,
    devolverUsuarioPorTipo,
    mostrarMascotasPorDni
};
