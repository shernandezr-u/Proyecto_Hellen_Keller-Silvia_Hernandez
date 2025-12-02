const idPEI = new URLSearchParams(window.location.search).get("id");

//Obtener los elementos del formulario
const inputIdPEI = document.getElementById("idPEI");
const inputNombrePEI = document.getElementById("nombrePEI");
const inputPorcentajeAvance = document.getElementById("porcentajeAvance");

//Cargar datos del programa al abrir la página
async function cargarDatosPEI() {
    try {
        const res = await fetch(`http://localhost:3000/pei/${idPEI}`);
        const pei = await res.json();

        inputIdPEI.value = pei._id;
        inputNombrePEI.value = pei.nombrePEI;
        inputPorcentajeAvance.value = pei.porcentajeAvance;

    } catch (error) {
        console.error("Error al cargar el programa", error);
    }
}

cargarDatosPEI();

//Enviar datos actualizados
document.getElementById("formEditarPEI").addEventListener("submit", async function (e) {
    e.preventDefault();

    const porcentaje = Number(inputPorcentajeAvance.value);

        if (porcentaje < 0 || porcentaje > 100) {
            Swal.fire({
                icon: "error",
                title: "Porcentaje inválido",
                text: "El porcentaje de avance debe estar entre 0 y 100.",
            });
            return;
        }

    const peiActualizado = {
        porcentajeAvance: inputPorcentajeAvance.value 
    };

    try {
        const res = await fetch(`http://localhost:3000/pei/${idPEI}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(peiActualizado)
        });

        const data = await res.json();

        //Error de pei duplicado
        if (res.status === 409) {
            Swal.fire({
                icon: "error",
                title: "PEI duplicado",
                text: "Existe otro Plan Educativo Individualizado con el mismo nombre.",
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

        //Avance de PEI actualizado con éxito
        Swal.fire({
            icon: "success",
            title: "Avance de PEI actualizado",
            text: "Los cambios fueron guardados correctamente.",
        }).then(() => {
            window.location.href = "pei-listar.html";
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