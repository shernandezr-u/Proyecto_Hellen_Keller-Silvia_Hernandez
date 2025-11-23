const idUsuario = new URLSearchParams(window.location.search).get("id");

//Obtener los elementos del formulario
const inputId = document.getElementById("idUsuario");
const inputNombre = document.getElementById("nombre");
const inputCedula = document.getElementById("cedula");
const inputCorreo = document.getElementById("correo");
const inputCelular = document.getElementById("celular");
const inputDireccion = document.getElementById("direccion");
const inputRol = document.getElementById("rol");

//Cargar datos del usuario al abrir la página
async function cargarDatos() {
    try {
        const res = await fetch(`http://localhost:3000/usuarios/${idUsuario}`);
        const usuario = await res.json();

        inputId.value = usuario._id;
        inputNombre.value = usuario.nombre;
        inputCedula.value = usuario.cedula;
        inputCorreo.value = usuario.correo;
        inputCelular.value = usuario.celular;
        inputDireccion.value = usuario.direccion;
        inputRol.value = usuario.rol;

    } catch (error) {
        console.error("Error al cargar usuario", error);
    }
}

cargarDatos();

//Enviar datos actualizados
document.getElementById("formEditarUsuario").addEventListener("submit", async function (e) {
    e.preventDefault();

    const usuarioActualizado = {
        nombre: inputNombre.value,
        cedula: inputCedula.value,
        correo: inputCorreo.value,
        celular: inputCelular.value,
        direccion: inputDireccion.value,
        rol: inputRol.value
    };

    try {
        const res = await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuarioActualizado)
        });

        const data = await res.json();

        //Error de cédula duplicada
        if (res.status === 409) {
            Swal.fire({
                icon: "error",
                title: "Cédula duplicada",
                text: "Existe otro usuario con la cédula indicada.",
            });
            return;
        }

        //Otros errores
        if (!res.ok || !data.success) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.mensaje || "No se pudo actualizar el usuario.",
            });
            return;
        }

        //Usduario actualizado con éxito
        Swal.fire({
            icon: "success",
            title: "Usuario actualizado",
            text: "Los cambios fueron guardados correctamente.",
        }).then(() => {
            window.location.href = "usuario-listar.html";
        });

    } catch (error) {
        console.error("Error al editar", error);
        Swal.fire({
            icon: "error",
            title: "Error del servidor",
            text: "Ocurrió un problema con la conexión.",
        });
    }
});