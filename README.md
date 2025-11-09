# Sistema para el Centro Nacional de Educación Hellen Keller

Es un sistema de gestión académica y administrativa para el Centro Nacional de Educación Hellen Keller. La plataforma web es diseñada para centralizar y optimizar los procesos educativos que ofrece la institución. 

Permite la gestión de usuarios, programas educativos, terapias, y el seguimiento individualizado de estudiantes con necesidades especiales, garantizando accesibilidad y facilidad de uso para todos los perfiles del sistema.

---

## Tecnologías utilizadas
- **Frontend:** HTML5, CSS, JavaScript y Bootstrap.
- **Backend:** Node.js.
- **Base de Datos:** MongoDB.
- **Control de Versiones:** GitHub.

---

## Convenciones de nomenclatura

- **Archivos:** nombres en minúsculas y separados por guiones (`kebab-case`), ejemplo: `inicio-sesion.js`.
- **Carpetas:** minúsculas y descriptivas, ejemplo: `requerimientos`, `front-end`, `back-end`.
- **Variables y funciones:** `camelCase` (ejemplo: `inputNombre`).

---

## Tipos de commit

| Tipo | Descripción |
|------|--------------|
| **[new]** | Se ha creado un método o recurso en el programa que no existía antes del commit. |
| **[improved]** | Se mejoró la forma en que se hacía un método o como se mostraba algo. No es un problema como tal. |
| **[fixed]** | Se corrigió un problema o algo que estaba mal. |
| **[updated]** | Se reemplazó un recurso o código por otro realizado por alguien más. |
| **[init]** | Commit especial que indica el inicio del repositorio. |
| **[incomplete]** | Commit especial que indica que se ha respaldado una versión inestable o incompleta de la funcionalidad. |


### Convención de mensajes de commit
Los mensajes de commit deben seguir esta estructura:

[tipo]: <mensaje breve de lo que se está cambiando>

**Ejemplo:**
[new]: agregar inicio de sesión
[fixed]: corrección contraste de colores en formularios
[updated]: actualización de requerimientos funcionales


## Estrategia de ramas (branches)

Se utiliza el modelo **Git Flow** simplificado:
- `main`: contiene versiones estables y liberadas.
- `develop`: integración de nuevas funcionalidades.
- `feature/*`: desarrollo de características específicas.
- `fix/*`: corrección de errores.
- `docs/*`: cambios en documentación.
  
**Ejemplo:**

feature/formulario-inicio-sesion

fix/barra-navegación

docs/readme-actualización


## Documentación de requerimientos
- [Requerimientos funcionales](/requerimientos/functional-requirements.md)  
- [Requerimientos no funcionales](/requerimientos/non-functional-requirements.md)  

## Características principales
- **Inicio de sesión accesible:** autenticación por correo o cédula con opción de recuperación audible.  
- **Roles de usuario diferenciados:** administrador, docente/terapeuta y estudiantes.  
- **Gestión académica completa:** registro de programas, usuarios, planes educativos individualizados (PEI) y progreso de los estudiantes.  
- **Accesibilidad visual y auditiva:** diseño de alta visibilidad con soporte para verificación por audio. 