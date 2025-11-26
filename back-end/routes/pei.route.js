const express = require("express");
const router = express.Router();
const PEI = require("../models/pei.model");

//Rutas para el CRUD de programas

//POST: Crear - enviar datos a la base de datos

router.post("/", async (req, res) => {
    const {nombrePEI, nombreEstudiante, objetivos, adaptaciones, criterioAprobacion, porcentajeAvance} = req.body;
    if (!nombrePEI || !nombreEstudiante || !objetivos || !adaptaciones || !criterioAprobacion || !porcentajeAvance) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    //Crear un nuevo PEI en la base de datos

    try {
        const nuevoPEI = new PEI({nombrePEI, nombreEstudiante, objetivos, adaptaciones, criterioAprobacion, porcentajeAvance});
        await nuevoPEI.save();
        res.status(201).json(nuevoPEI);
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
        const pei = await PEI.find();
        res.json(pei);
    } catch (error) {
        res.status(400).json({mensajeError: error.message});
    }
})

//GET: Obtener el PEI por el id

router.get("/:id", async (req, res) => {
    try {
        const pei = await PEI.findById(req.params.id);
        res.json(pei);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT: Actualizar un PEI por id
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombrePEI, nombreEstudiante, objetivos, adaptaciones, criterioAprobacion, porcentajeAvance } = req.body;

    try {
        // Verificar si el nombre del programa pertenece a otro programa
        const peiExistente = await PEI.findOne({ nombrePEI });

        if (peiExistente && peiExistente._id.toString() !== id) {
            return res.status(409).json({
                success: false,
                mensaje: "Existe otro PEI con el nombre indicado"
            });
        }

        const peiActualizado = await PEI.findByIdAndUpdate(
            id,
            { nombrePEI, nombreEstudiante, objetivos, adaptaciones, criterioAprobacion, porcentajeAvance },
            { new: true }
        );

        if (!peiActualizado) {
            return res.status(404).json({
                success: false,
                mensaje: "PEI no encontrado"
            });
        }

        res.json({
            success: true,
            mensaje: "PEI actualizada correctamente",
            usuario: peiActualizado
        });

    } catch (error) {
    console.error("Error actualizando programa:", error);

    res.status(500).json({
        success: false,
        mensaje: "Error actualizando programa",
        error: error.message
    });
}
});

//Exportar la ruta

module.exports = router;