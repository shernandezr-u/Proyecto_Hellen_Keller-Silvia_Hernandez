# Requerimientos no funcionales  
**Proyecto:** Sistema de Gestión Académica y Administrativa – Centro Nacional de Educación Hellen Keller  

---

## Descripción
Los requerimientos no funcionales definen las características de calidad, rendimiento, seguridad y accesibilidad del sistema.  

---

## Lista de requerimientos no funcionales

| Identificador | Requerimiento | Métrica / Criterio de Verificación |
|----|----------------|------------------------------------|
| **RNF-01** | El tiempo de carga de cada página no debe superar los 3 segundos. | Pruebas de carga deben mostrar un tiempo ≤ 3 s. |
| **RNF-02** | Las operaciones CRUD (crear, leer, actualizar, eliminar) deben completarse en menos de 2 segundos. | Pruebas funcionales deben registrar un tiempo promedio de respuesta menor o igual a 2 segundos |
| **RNF-03** | El sistema debe soportar hasta 50 usuarios concurrentes sin pérdida de rendimiento. | Pruebas de carga deben mostrar un uso de CPU menor o igual al 80% y respuesta menor o igual a 3 segundos |
| **RNF-04** | Todos los elementos deben ser navegables mediante teclado. | Pruebas de accesibilidad deben confirmar que se puede acceder a todas las funciones con tabulador. |
| **RNF-05** | El sistema debe cumplir con los estándares WCAG 2.1 nivel AA. | Evaluaciones automáticas y manuales deben mostrar cumplimiento de al menos 90%. |
| **RNF-06** | El sistema debe ser compatible con lectores de pantalla. | Pruebas con Narrador de Windows debe confirmar lectura completa de los elementos de la interfaz. |
| **RNF-07** | La arquitectura del sistema debe permitir agregar nuevos módulos sin afectar los existentes. | Pruebas de integración deben demostrar independencia de módulos y bajo acoplamiento. |
| **RNF-08** | El sistema debe estar disponible el 99% del tiempo por mes. | Registros del servidor deben indicar una disponibilidad ≥ 99% mensual. |
| **RNF-09** | El sistema debe ser responsivo y adaptarse a dispositivos móviles, y computadoras. | Pruebas de diseño adaptable deben mostrar correcta visualización y funcionalidad en resoluciones de celular y desktop. |