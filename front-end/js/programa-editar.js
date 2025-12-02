const idPrograma = new URLSearchParams(window.location.search).get("id");

//Obtener los elementos del formulario
const inputIdPrograma = document.getElementById("idPrograma");
const inputNombrePrograma = document.getElementById("nombrePrograma");
const inputDescripcion = document.getElementById("descripcion");
const inputEspecialidad = document.getElementById("especialidad");
const inputDuracion = document.getElementById("duracion");
const inputRecursos = document.getElementById("recursos");
const inputCupo = document.getElementById("cupo");
const inputPrerequisitos = document.getElementById("prerequisitos");
const inputEstado = document.getElementById("estado");

//Cargar datos del programa al abrir la página
async function cargarDatosPrograma() {
    try {
        const res = await fetch(`http://localhost:3000/programas/${idPrograma}`);
        const programa = await res.json();

        inputIdPrograma.value = programa._id;
        inputNombrePrograma.value = programa.nombrePrograma;
        inputDescripcion.value = programa.descripcion;
        inputEspecialidad.value = programa.especialidad;
        inputDuracion.value = programa.duracion;
        inputRecursos.value = programa.recursos;
        inputCupo.value = programa.cupo;
        inputPrerequisitos.value = programa.prerequisitos;
        inputEstado.value = programa.estado;

    } catch (error) {
        console.error("Error al cargar el programa", error);
    }
}

cargarDatosPrograma();

//Enviar datos actualizados
document.getElementById("formEditarPrograma").addEventListener("submit", async function (e) {
    e.preventDefault();

    const cupo = Number(inputCupo.value);

    if (cupo < 0 || cupo > 8) {
        Swal.fire({
            icon: "error",
            title: "Cantidad de cupos inválida",
            text: "La cantidad de cupos no puede ser mayor a 8.",
        });
        return;
    }

    const programaActualizado = {
        nombrePrograma: inputNombrePrograma.value,
        descripcion: inputDescripcion.value,
        especialidad: inputEspecialidad.value,
        duracion: inputDuracion.value,
        recursos: inputRecursos.value,
        cupo: inputCupo.value,
        prerequisitos: inputPrerequisitos.value,
        estado: inputEstado.value  
    };

    try {
        const res = await fetch(`http://localhost:3000/programas/${idPrograma}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(programaActualizado)
        });

        const data = await res.json();

        //Error de programa duplicado
        if (res.status === 409) {
            Swal.fire({
                icon: "error",
                title: "Programa/terapia duplicada",
                text: "Existe otro programa o terapia con el mismo nombre.",
            });
            return;
        }

        //Otros errores
        if (!res.ok || !data.success) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.mensaje || "No se pudo actualizar el programa o terapia.",
            });
            return;
        }

        //Programa actualizado con éxito
        Swal.fire({
            icon: "success",
            title: "Programa/terapia actualizada",
            text: "Los cambios fueron guardados correctamente.",
        }).then(() => {
            window.location.href = "programa-listar.html";
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