//Programa: nombre (string), descripcion (string), especialidad (string), duración (string), cupo (number), prerequisitos (string), estado (string)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const programaSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        required: true,
        unique: true
    },
    descripcion: {
        type: String, 
        required: true, 
    },
    especialidad: {
        type: String, 
        required: true
    },
    duracion: {
        type: String, 
        required: true
    },
    cupo: {
        type: Number, 
        required: true
    },
    prerequisitos: {
        type: String, 
        required: true
    },
    estado: {
        type: String, 
        enum: ["Activo", "Inactivo"],
        required: true
    }
});

//Para exportar el modelo y poder utilizarlo en otros archivos

const Programa = mongoose.model("Programa", programaSchema);
module.exports = Programa;