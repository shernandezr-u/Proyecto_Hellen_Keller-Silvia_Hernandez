# Requerimientos funcionales  
**Proyecto:** Sistema de Gestión Académica y Administrativa – Centro Nacional de Educación Hellen Keller  

---

## Descripción
Los siguientes requerimientos funcionales describen las **acciones, comportamientos y funcionalidades medibles** que el sistema debe cumplir para garantizar la correcta gestión de usuarios, programas educativos y seguimiento de estudiantes.

---

## Lista de requerimientos funcionales

| Identificador | Requerimiento | Criterios de Verificación |
|----|----------------|----------------------------|
| **RF-01** | El sistema debe permitir que los usuarios inicien sesión utilizando correo electrónico o número de cédula. | Se verifica que el formulario de inicio de sesión acepte ambos campos y valide los formatos de entrada. |
| **RF-02** | El sistema debe validar que las credenciales sean correctas para permitir el acceso. | Se debe mostrar un mensaje de error en caso de credenciales inválidas y permitir el acceso solo a usuarios válidos. |
| **RF-03** | El formulario de inicio de sesión debe incluir el logotipo del Centro Hellen Keller y colores de alta visibilidad. | El diseño debe cumplir con las pautas de accesibilidad visual y contener el logotipo institucional. |
| **RF-04** | El administrador podrá registrar nuevos programas o terapias. | Al registrar un programa, debe guardarse correctamente en la base de datos y mostrarse en el listado general. |
| **RF-05** | El administrador podrá editar o eliminar programas existentes. | Las modificaciones o eliminaciones deben reflejarse inmediatamente en la interfaz y la base de datos. |
| **RF-06** | El administrador podrá registrar usuarios. | El sistema debe permitir registrar al menos los campos: nombre, rol, correo/cédula, y contraseña. |
| **RF-07** | El administrador podrá asignar roles y permisos a cada usuario. | Se verifica que cada usuario tenga acceso solo a las funciones correspondientes a su rol. |
| **RF-08** | El docente o terapeuta podrá crear Planes Educativos Individualizados (PEI) para sus estudiantes. | Los PEI creados deben almacenarse y asociarse correctamente a cada estudiante. |
| **RF-09** | El docente o terapeuta podrá editar los PEI existentes. | Los cambios deben guardarse y visualizarse correctamente en el listado de PEI. |
| **RF-10** | El docente podrá registrar el progreso del estudiante mediante métricas (porcentaje de cumplimiento). | El sistema debe permitir agregar los aciertos y el total de intentos para calcular el porcentaje de cumplimiento y guardar la información en la base de datos. |
