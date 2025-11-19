document.addEventListener('DOMContentLoaded', function() {
    // Cargar la barra de navegación
    fetch('components/navbar-docente.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container-docente').innerHTML = data;
            
            // Obtener ruta actual completa (sin dominio)
            const currentPath = window.location.pathname;

            // Selecciona todos los enlaces del navbar, incluyendo dropdowns
            const allLinks = document.querySelectorAll('.navbar a');

            allLinks.forEach(link => {
                const href = link.getAttribute('href');

                if (!href || href === "#") return;

                // Comparación con ruta completa
                if (currentPath.endsWith(href) || currentPath === href) {

                    // Marcar activo el hijo
                    link.classList.add('active');

                    // Si es dropdown-item: marcar padre también
                    const parentDropdown = link.closest('.dropdown');
                    if (parentDropdown) {
                        const parentLink = parentDropdown.querySelector('.nav-link');
                        if (parentLink) parentLink.classList.add('active');
                    }
                }
            });
        })
        .catch(error => console.error('Error cargando la barra de navegación:', error));
});