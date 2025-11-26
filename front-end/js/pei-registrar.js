const inputNombrePEI = document.getElementById("nombrePEI");
const inputNombreEstudiante = document.getElementById("nombreEstudiante");
const inputObjetivos = document.getElementById("objetivos");
const inputAdaptaciones = document.getElementById("adaptaciones");
const inputCriterioAprobacion = document.getElementById("criterioAprobacion");
const inputPorcentajeAvance = document.getElementById("porcentajeAvance");
const btnGuardar = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll("input[required], textarea[required]");

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
    if (error == false) {
        registrarPEI();
    }
}

function registrarPEI() {
    const datosNuevoPEI = {
        nombrePEI: inputNombrePEI.value,
        nombreEstudiante: inputNombreEstudiante.value,
        objetivos: inputObjetivos.value,
        adaptaciones: inputAdaptaciones.value,
        criterioAprobacion: inputCriterioAprobacion.value,
        porcentajeAvance: inputPorcentajeAvance.value
    };
    fetch("http://localhost:3000/pei", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(datosNuevoPEI)
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
        title: "PEI registrado con éxito",
        text: "El plan educativo personalizado ha sido registrado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
    limpiarFormularioPEI();
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

function limpiarFormularioPEI() {
    inputNombrePEI.value = "";
    inputNombreEstudiante.value = "";
    inputAdaptaciones.value = "";
    inputCriterioAprobacion.value = "";
    inputPorcentajeAvance.value = "";
    inputObjetivos.value = "";
}

btnGuardar.addEventListener("click", validar);