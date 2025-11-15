//Modelo (esqueleto, estructura) de lo que se almacenará en la base de datos
//Usuario: correo (string), nombre (string), cédula (string), celular (number), direccion (string), rol (string), contraseña (string)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creación del esquema
const usuarioSchema = new mongoose.Schema({
    correo: {
        type: String, 
        required: true, 
        unique: true
    },
    nombre: {
        type: String, 
        required: true
    },
    cedula: {
        type: String, 
        required: true, 
        unique: true
    },
    celular: {
        type: Number, 
        required: true
    },
    direccion: {
        type: String, 
        required: true
    },
    rol: {
        type: String, 
        enum: ["administrador", "docente"],
        required: true
    },
    contrasenia: {
        type: String, 
        required: true
    }

});

//Para exportar el modelo y poder utilizarlo en otros archivos

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;