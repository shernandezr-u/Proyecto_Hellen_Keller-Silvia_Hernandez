const dashboardContent = document.getElementById("dashboardContent");
const loadingSpinner = document.getElementById("loadingSpinner");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");
const refreshBtn = document.getElementById("refreshBtn");

// Variables para almacenar datos
let estadisticasUsuarios = null;
let estadisticasProgramas = null;

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

// Consultar estadísticas usuarios
async function consultarEstadisticasUsuarios() {
    try {
        const response = await fetch("http://localhost:3000/usuarios/estadisticas", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const datosUsuarios = await response.json();
        return datosUsuarios;
    } catch (error) {
        console.error("Error al consultar estadísticas de usuarios:", error);
        throw error;
    }
}

// Consultar estadísticas programas
async function consultarEstadisticasProgramas() {
    try {
        const response = await fetch("http://localhost:3000/programas/estadisticas", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const datosProgramas = await response.json();
        return datosProgramas;
    } catch (error) {
        console.error("Error al consultar estadísticas de programas/terapias:", error);
        throw error;
    }
}

// Actualizar las tarjetas de estadísticas usuarios
function actualizarEstadisticasUsuarios() {
    if (!estadisticasUsuarios) return;

    document.getElementById('totalUsuarios').textContent = estadisticasUsuarios.totalUsuarios;
    document.getElementById('totalAdmins').textContent = estadisticasUsuarios.totalAdmins;
    document.getElementById('totalDocentes').textContent = estadisticasUsuarios.totalDocentes;
}

// Actualizar las tarjetas de estadísticas programas/terapias
function actualizarEstadisticasProgramas() {
    if (!estadisticasProgramas) return;

    document.getElementById('totalProgramas').textContent = estadisticasProgramas.totalProgramas;
    document.getElementById('programasActivos').textContent = estadisticasProgramas.programasActivos;
    document.getElementById('programasInactivos').textContent = estadisticasProgramas.programasInactivos;
}

// Cargar todos los datos del dashboard
async function cargarDashboard() {
    mostrarLoading(true);

    try {
        // Consultar datos en paralelo
        const [estadUsuarios, estadProgramas] = await Promise.all([
            consultarEstadisticasUsuarios(),
            consultarEstadisticasProgramas()
        ]);

        // Guardar datos
        estadisticasUsuarios = estadUsuarios;
        estadisticasProgramas = estadProgramas;

        // Actualizar interfaz
        actualizarEstadisticasUsuarios();
        actualizarEstadisticasProgramas();
        
        mostrarLoading(false);

    } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        mostrarError(`No se pudieron cargar los datos: ${error.message}`);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cargar dashboard al iniciar
    cargarDashboard();

    // Configurar botón de actualización
    if (refreshBtn) {
        refreshBtn.addEventListener('click', cargarDashboard);
    }
});

// Exportar funciones para uso global (si es necesario)
window.cargarDashboard = cargarDashboard;
window.consultarEstadisticasUsuarios = consultarEstadisticasUsuarios;
window.consultarEstadisticasProgramas = consultarEstadisticasProgramas;