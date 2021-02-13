const {DataTypes} = require("sequelize");
const crypto = require ("crypto");
const jwt = require("jsonwebtoken");

const usuario_model = (conexion) => {
  let usuario = conexion.define("usuarios", {
      usuario_dni: {
        primaryKey: true,
        type: DataTypes.STRING(8),
        unique: true,
        allowNull: false,
      },
      usuario_nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      usuario_apellido: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      usuario_celular: {
        type: DataTypes.STRING(9),
        unique: true,
        allowNull: false,
        validate: {
          min: 900000000,
          max: 999999999,
          isNumeric: true,
        },
      },
      usuario_direccion: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      usuario_distrito: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      usuario_fecha_nacimiento: {
        type: DataTypes.DATEONLY,
      },
      usuario_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        //Tipo 1: ADMINISTRADOR
        //Tipo 2: PROPIETARIO MASCOTA
        //Tipo 3: VETERINARIO
      },
      usuario_correo: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      usuario_hash: {
        type: DataTypes.TEXT,
      },
      usuario_salt: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "t_usuario",
      timestamps: true,
    }
  );
  //USANDO PROTOTYPE PARA LA AUTENTICACION DE LOS USUARIOS
  usuario.prototype.setSaltAndHash = function(password) {
    this.usuario_salt = crypto.randomBytes(16).toString("hex");
    this.usuario_hash = crypto.pbkdf2Sync(password, this.usuario_salt, 1000, 64, "sha512").toString("hex");
  };
  usuario.prototype.generarJWT = function() {
    let payload = {
        usuario_dni: this.usuario_dni,
        usuario_nombre: this.usuario_nombre,
        usuario_apellido: this.usuario_apellido,
        usuario_tipo: this.usuario_tipo,
    };
    let password = process.env.JWT_SECRET || "petshop4";
    let token = jwt.sign(
        payload,
        password,
        {expiresIn: 120},
        {algorithm: "RS256"}
    );
    return token;
    };
    usuario.prototype.validarPassword = function (password){
      let hash_temporal = crypto.pbkdf2Sync (password, this.usuario_salt, 1000, 64, "sha512").toString('hex');
      return hash_temporal === this.usuario_hash ? true : false;
    };
  return usuario;
};

module.exports = usuario_model;
