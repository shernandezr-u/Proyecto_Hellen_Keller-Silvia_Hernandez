const express = require("express");
const router = express.Router(); //Crear la señal
const Usuario = require("../models/usuario.model"); //Importar el modelo
const bcrypt = require('bcryptjs');

//Rutas para el CRUD de usuarios

// POST: Crear un nuevo usuario con la contraseña encriptada para mayor seguridad
router.post("/", async (req, res) => {
    const {nombre, cedula, correo, celular, direccion, rol, contrasenia} = req.body;

    // Validar que existan los datos que son obligatorios 
    if (!nombre || !cedula || !correo || !celular || !direccion || !rol || !contrasenia) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    try {
        const saltRounds = 10; // Número de rondas de hashing (costo computacional)
        const hashedPassword = await bcrypt.hash(contrasenia, saltRounds); // Aplica algoritmo de hashing múltiples veces
        /* Ejemplo
        Contraseña original: "miPassword123"
        Hash resultante: "$2b$10$s8S5Gf2xOcHj9kLmNqRvT.uVwXyZ1A2B3C4D5E6F7G8H9I0J1K2L3M4"
        */

        const nuevoUsuario = new Usuario({nombre, cedula, correo, celular, direccion, rol, contrasenia: hashedPassword});
        await nuevoUsuario.save();

        // No retornar la contraseña en la respuesta
        const usuarioResponse = {
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            cedula: nuevoUsuario.cedula,
            correo: nuevoUsuario.correo,
            celular: nuevoUsuario.celular,
            direccion: nuevoUsuario.direccion,
            rol: nuevoUsuario.rol
        };

        res.status(201).json({ success: true, mensaje: "Usuario creado exitosamente", usuario: usuarioResponse });
    } catch (error) {
        res.status(400).json({ success: false, mensajeError: error.message });
    }
});

//POST: Validar usuario y contraseña encriptada
router.post("/login-encriptado", async (req, res) => {
    const { correo, contrasenia } = req.body;

    // Validar que existan los datos obligatorios
    if (!correo || !contrasenia) {
        return res.status(400).json({ success: false, mensaje: "El correo y la contraseña son obligatorios" });
    }

    try {
        // Buscar usuario por correo
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({ success: false, mensaje: "Usuario no encontrado" });
        }

        // Comparar contraseñas
        const esContraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);

        if (!esContraseniaValida) {
            return res.status(401).json({ success: false, mensaje: "Contraseña incorrecta" });
        }

        // Si las credenciales son válidas, retornar datos del usuario (sin contraseña)
        const usuarioResponse = {
            id: usuario._id,
            nombre: usuario.nombre,
            cedula: usuario.cedula,
            correo: usuario.correo,
            celular: usuario.celular,
            direccion: usuario.direccion,
            rol: usuario.rol
        };

        res.status(200).json({ success: true, mensaje: "Inicio de sesión exitoso", usuario: usuarioResponse });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ success: false, mensaje: "Error en el servidor al validar credenciales", error: error.message });
    }
});


//GET: Leer - obtener datos de todos los usuarios

router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(400).json({mensajeError: error.message});
    }
})

//GET: Obtener estadísticas de usuarios

router.get("/estadisticas", async (req, res) => {
    try {
        const totalUsuarios = await Usuario.countDocuments();
        const totalAdmins = await Usuario.countDocuments({ rol: "Administrador" });
        const totalDocentes = await Usuario.countDocuments({ rol: "Docente/Terapeuta" });

        res.json({
            totalUsuarios,
            totalAdmins,
            totalDocentes
        });
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo estadísticas", error });
    }
});

//GET: Obtener el usuario por el id

router.get("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT: Actualizar un usuario por id
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, cedula, correo, celular, direccion, rol } = req.body;

    try {
        // Verificar si la cédula pertenece a otro usuario
        const cedulaExistente = await Usuario.findOne({ cedula });

        if (cedulaExistente && cedulaExistente._id.toString() !== id) {
            return res.status(409).json({
                success: false,
                mensaje: "Existe otro usuario con la cédula indicada"
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            id,
            { nombre, cedula, correo, celular, direccion, rol },
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({
                success: false,
                mensaje: "Usuario no encontrado"
            });
        }

        res.json({
            success: true,
            mensaje: "Usuario actualizado correctamente",
            usuario: usuarioActualizado
        });

    } catch (error) {
    console.error("Error actualizando usuario:", error);

    res.status(500).json({
        success: false,
        mensaje: "Error actualizando usuario",
        error: error.message
    });
}
});



//Exportar la ruta

module.exports = router;