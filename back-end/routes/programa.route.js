const express = require("express");
const router = express.Router();
const Programa = require("../models/programa.model");

//Rutas para el CRUD de programas

//POST: Crear - enviar datos a la base de datos

router.post("/", async (req, res) => {
    const {nombrePrograma, descripcion, especialidad, duracion, cupo, prerequisitos, estado} = req.body;
    if (!nombrePrograma || !descripcion || !especialidad || !duracion || !cupo || !prerequisitos || !estado) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    //Crear un nuevo programa en la base de datos

    try {
        const nuevoPrograma = new Programa({nombrePrograma, descripcion, especialidad, duracion, cupo, prerequisitos, estado});
        await nuevoPrograma.save();
        res.status(201).json(nuevoPrograma);
    } catch (error) {

    // Error por nombre duplicado
    if (error.code === 11000) {
        return res.status(400).json({
            mensajeError: "Ya existe un programa con ese nombre."
        });
    }

    res.status(500).json({
        mensajeError: "Ocurrió un error en el servidor",
        detalle: error.message
    });
}

});

//GET: Leer - obtener datos del servidor

router.get("/", async (req, res) => {
    try {
        const programas = await Programa.find();
        res.json(programas);
    } catch (error) {
        res.status(400).json({mensajeError: error.message});
    }
})

//Exportar la ruta

module.exports = router;