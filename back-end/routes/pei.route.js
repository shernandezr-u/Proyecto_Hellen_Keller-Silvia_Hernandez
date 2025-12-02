const express = require("express");
const router = express.Router();
const PEI = require("../models/pei.model");

//Rutas para el CRUD de programas

//POST: Crear - enviar datos a la base de datos

router.post("/", async (req, res) => {

    const {nombrePEI, objetivos, adaptaciones, criterioAprobacion, porcentajeAvance} = req.body;
    if (!nombrePEI || !objetivos || !adaptaciones || !criterioAprobacion || !porcentajeAvance) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    // Validar rango permitido 0–100 para porcentaje
    if (porcentajeAvance < 0 || porcentajeAvance > 100) {
        return res.status(400).json({
            success: false,
            mensaje: "El porcentaje de avance debe estar entre 0 y 100"
        });
    }

    //Crear un nuevo PEI en la base de datos

    try {
        const nuevoPEI = new PEI({nombrePEI, objetivos, adaptaciones, criterioAprobacion, porcentajeAvance});
        await nuevoPEI.save();
        res.status(201).json(nuevoPEI);
    } catch (error) {

    // Error por nombre duplicado
    if (error.code === 11000) {
        return res.status(400).json({
            mensajeError: "Ya existe un programa con ese nombre."
        });
    }

    // Validar porcentaje de avance dentro del rango 0-100
    if (porcentajeAvance < 0 || porcentajeAvance > 100) {
            return res.status(400).json({
                success: false,
                mensaje: "El porcentaje de avance debe estar entre 0 y 100"
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

//GET: Obtener estadísticas de PEI

router.get("/estadisticas", async (req, res) => {
    try {
        const peis = await PEI.find();

        const totalPEIs = peis.length;

        // Promedio de porcentaje de avance
        const sumaAvance = peis.reduce((acc, pei) => acc + (pei.porcentajeAvance || 0), 0);
        const promedioAvance = totalPEIs > 0 ? (sumaAvance / totalPEIs) : 0;

        // PEIs por completar (avance < 100)
        const peisPorCompletar = peis.filter(pei => pei.porcentajeAvance < 100).length;

        // PEIs en proceso (avance > 0 y < 100)
        const peisCompletados = peis.filter(pei => pei.porcentajeAvance === 100).length;

        res.json({
            totalPEIs,
            promedioAvance: promedioAvance.toFixed(0),
            peisPorCompletar,
            peisCompletados
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo estadísticas de PEIs" });
    }
});

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

    // Convertir porcentaje a número
    if (req.body.porcentajeAvance !== undefined) {
    req.body.porcentajeAvance = Number(req.body.porcentajeAvance);
}

    const { nombrePEI, objetivos, adaptaciones, criterioAprobacion, porcentajeAvance } = req.body;

    try {

        //Validar porcentaje de avance dentro del rango 0-100
        if (porcentajeAvance !== undefined && (porcentajeAvance < 0 || porcentajeAvance > 100)) {
            return res.status(400).json({
                success: false,
                mensaje: "El porcentaje de avance debe estar entre 0 y 100"
            });
        }

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
            { nombrePEI, objetivos, adaptaciones, criterioAprobacion, porcentajeAvance },
            { new: true }
        );

        if (!peiActualizado) {
            return res.status(404).json({
                success: false,
                mensaje: "PEI no encontrado"
            });
        }

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