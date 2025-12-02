const express = require("express");
const router = express.Router();
const Programa = require("../models/programa.model");

//Rutas para el CRUD de programas

//POST: Crear - enviar datos a la base de datos

router.post("/", async (req, res) => {
    const {nombrePrograma, descripcion, especialidad, duracion, recursos, cupo, prerequisitos, estado} = req.body;
    if (!nombrePrograma || !descripcion || !especialidad || !duracion || !recursos || !cupo || !prerequisitos || !estado) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    // Validar rango permitido para cupos
    if (cupo < 0 || cupo > 8) {
        return res.status(400).json({
            success: false,
            mensaje: "El cupo máximo permitido es 8",
        });
    }

    //Crear un nuevo programa en la base de datos

    try {
        const nuevoPrograma = new Programa({nombrePrograma, descripcion, especialidad, duracion, recursos, cupo, prerequisitos, estado});
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

// GET: Estadísticas de programas
router.get("/estadisticas", async (req, res) => {
    try {
        const totalProgramas = await Programa.countDocuments();
        const programasActivos = await Programa.countDocuments({ estado: "Activo" });
        const programasInactivos = await Programa.countDocuments({ estado: "Inactivo" });

        res.json({
            totalProgramas,
            programasActivos,
            programasInactivos
        });
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo estadísticas", error });
    }
});

//GET: Obtener el programa por el id

router.get("/:id", async (req, res) => {
    try {
        const programa = await Programa.findById(req.params.id);
        res.json(programa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT: Actualizar un programa por id
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombrePrograma, descripcion, especialidad, duracion, recursos, cupo, prerequisitos, estado } = req.body;

    try {

        // Validar rango permitido para cupos (0-8)
        if (cupo < 0 || cupo > 8) {
            return res.status(400).json({
                success: false,
                mensaje: "El cupo debe estar entre 0 y 8"
            });
        }

        // Verificar si el nombre del programa pertenece a otro programa
        const programaExistente = await Programa.findOne({ nombrePrograma });

        if (programaExistente && programaExistente._id.toString() !== id) {
            return res.status(409).json({
                success: false,
                mensaje: "Existe otro programa/terapia con el nombre indicado"
            });
        }

        const programaActualizado = await Programa.findByIdAndUpdate(
            id,
            { nombrePrograma, descripcion, especialidad, duracion, recursos, cupo, prerequisitos, estado },
            { new: true }
        );

        if (!programaActualizado) {
            return res.status(404).json({
                success: false,
                mensaje: "Programa no encontrado"
            });
        }

        res.json({
            success: true,
            mensaje: "Programa/terapia actualizada correctamente",
            usuario: programaActualizado
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