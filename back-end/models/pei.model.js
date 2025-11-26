const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const peiSchema = new mongoose.Schema({
    nombrePEI: {
        type: String, 
        required: true,
        unique: true
    },
    objetivos: {
        type: String, 
        required: true, 
    },
    adaptaciones: {
        type: String, 
        required: true
    },
    criterioAprobacion: {
        type: String, 
        required: true
    },
    porcentajeAvance: {
        type: Number,
        required: true
    }
    
});

//Para exportar el modelo y poder utilizarlo en otros archivos

const PEI = mongoose.model("PEI", peiSchema);
module.exports = PEI;