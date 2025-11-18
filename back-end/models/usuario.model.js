//Modelo (esqueleto, estructura) de lo que se almacenará en la base de datos
//Usuario: nombre (string), cédula (string), correo (string), celular (number), direccion (string), rol (string), contraseña (string)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        required: true
    },
    cedula: {
        type: String, 
        required: true, 
        unique: true
    },
    correo: {
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
        enum: ["Administrador", "Docente/Terapeuta"],
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