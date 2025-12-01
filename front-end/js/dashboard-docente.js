const dashboardContent = document.getElementById("dashboardContent");
const loadingSpinner = document.getElementById("loadingSpinner");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");
const refreshBtn = document.getElementById("refreshBtn");

// Variables globales
let estadisticasPEI = null;

// Función para mostrar/ocultar loading
function mostrarLoading(mostrar) {
    if (mostrar) {
        loadingSpinner.style.display = 'block';
        dashboardContent.style.display = 'none';
        errorMessage.style.display = 'none';
    } else {
        loadingSpinner.style.display = 'none';
        dashboardContent.style.display = 'block';
    }
}

// Función para mostrar error
function mostrarError(mensaje) {
    errorText.textContent = mensaje;
    errorMessage.style.display = 'block';
    dashboardContent.style.display = 'none';
    loadingSpinner.style.display = 'none';
}

// Consultar estadísticas PEI
async function consultarEstadisticasPEI() {
    try {
        const response = await fetch("http://localhost:3000/pei/estadisticas", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const datosPEI = await response.json();
        return datosPEI;
    } catch (error) {
        console.error("Error al consultar estadísticas de los PEIs:", error);
        throw error;
    }
}

// Actualizar las tarjetas de estadísticas usuarios
function actualizarEstadisticasPEI() {
    document.getElementById("totalPEIs").textContent = estadisticasPEI.totalPEIs;
    document.getElementById("promedioAvance").textContent = estadisticasPEI.promedioAvance + "%";
    document.getElementById("peisPorCompletar").textContent = estadisticasPEI.peisPorCompletar;
    document.getElementById("peisCompletados").textContent = estadisticasPEI.peisCompletados;
}

// Cargar todos los datos del dashboard
async function cargarDashboardDocente() {
    mostrarLoading(true);

    try {
        // Consultar datos en paralelo
        const [estadPEI] = await Promise.all([
            consultarEstadisticasPEI(),
        ]);

        // Guardar datos
        estadisticasPEI = estadPEI;

        // Actualizar interfaz
        actualizarEstadisticasPEI();
        
        mostrarLoading(false);

    } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        mostrarError(`No se pudieron cargar los datos: ${error.message}`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Cargar dashboard al iniciar
    cargarDashboardDocente();

    // Configurar botón de actualización
    if (refreshBtn) {
        refreshBtn.addEventListener('click', cargarDashboardDocente);
    }
});

// Exportar funciones para uso global (si es necesario)
window.cargarDashboardDocente = cargarDashboardDocente;
window.consultarEstadisticasPEI = consultarEstadisticasPEI;