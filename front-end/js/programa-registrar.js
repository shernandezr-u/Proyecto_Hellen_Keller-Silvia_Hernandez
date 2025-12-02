const inputNombrePrograma = document.getElementById("nombrePrograma");
const inputDescripcion = document.getElementById("descripcion");
const inputEspecialidad = document.getElementById("especialidad");
const inputDuracion = document.getElementById("duracion");
const inputRecursos = document.getElementById("recursos");
const inputCupo = document.getElementById("cupo");
const inputPrerequisitos = document.getElementById("prerequisitos");
const inputEstado = document.getElementById("estado");
const btnGuardar = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll("input[required]");

// Validar campos antes de registrar
function validar() {
    let error = false;
    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value == "") {
            error = true;
            Swal.fire({
                icon: "warning",
                title: "No se puede registrar el programa",
                text: "Por favor complete todos los campos.",
                confirmButtonText: "Aceptar"
            });
        }
    }

    // Validar rango permitido 0–100 para porcentaje
    const cupo = Number(inputCupo.value);

    if (cupo < 0 || cupo > 8) {
        Swal.fire({
            icon: "error",
            title: "Cantidad de cupos inválida",
            text: "La cantidad de cupos no puede ser mayor a 8.",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    if (error == false) {
        registrarPrograma();
    }
}

function registrarPrograma() {
    const datosNuevoPrograma = {
        nombrePrograma: inputNombrePrograma.value,
        descripcion: inputDescripcion.value,
        especialidad: inputEspecialidad.value,
        duracion: inputDuracion.value,
        recursos: inputRecursos.value,
        cupo: inputCupo.value,
        prerequisitos: inputPrerequisitos.value,
        estado: inputEstado.value
    };
    fetch("http://localhost:3000/programas", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(datosNuevoPrograma)
})
.then(async response => {
    const data = await response.json();

    if (!response.ok) {
        Swal.fire({
            icon: "error",
            title: "No se pudo registrar",
            text: data.mensajeError || "Ocurrió un error inesperado",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    Swal.fire({
        title: "Programa registrado con éxito",
        text: "El programa/terapia ha sido registrado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
    limpiarFormularioPrograma();
})
.catch(error => {
    console.log(error);
    Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
        confirmButtonText: "Aceptar"
    });
});

}

function limpiarFormularioPrograma() {
    inputNombrePrograma.value = "";
    inputDescripcion.value = "";
    inputEspecialidad.value = "";
    inputDuracion.value = "";
    inputRecursos.value = "";
    inputCupo.value = "";
    inputPrerequisitos.value = "";
    inputEstado.selectedIndex = 0;
}

btnGuardar.addEventListener("click", validar);