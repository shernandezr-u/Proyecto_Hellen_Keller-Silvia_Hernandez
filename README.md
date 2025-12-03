# Sistema para el Centro Nacional de Educación Hellen Keller

Es un sistema de gestión académica y administrativa para el Centro Nacional de Educación Hellen Keller. La plataforma web es diseñada para centralizar y optimizar los procesos educativos que ofrece la institución. 

Permite la gestión de usuarios, programas educativos, terapias, y el seguimiento individualizado de estudiantes con necesidades especiales, garantizando accesibilidad y facilidad de uso para todos los perfiles del sistema.

---

## Características principales
- **Inicio de sesión accesible:** autenticación por correo electrónico accesible.  
- **Roles de usuario diferenciados:** administrador y docente/terapeuta.  
- **Gestión académica completa:** registro de programas, usuarios, planes educativos individualizados (PEI) y progreso de los estudiantes.  
- **Accesibilidad visual y auditiva:** diseño de alta visibilidad con soporte para lector de pantalla. 
- **Interfaz optimizada:** fácil de usar para instituciones educativas.

---

## Tecnologías utilizadas
- **Frontend:** HTML5, CSS, JavaScript y Bootstrap.
- **Backend:** Node.js (express, mongoose)
- **Base de Datos:** MongoDB.
- **Control de Versiones:** GitHub.

---

## Instalación y configuración

### Programas requeridos:
- Visual Studio Code
- Node.js
- Extension Live Server en Visual Studio Code

### Instalar Visual Studio Code:
1. Descargar desde: https://code.visualstudio.com/
2. Instalar normalmente  
3. Instalar extensión **Live Server**  
   - En VS Code → Extensions → Buscar: `Live Server` → Install

### Instalar Node.js:
1. Ir a: https://nodejs.org/ 
2. Descargar para el sistema operativo deseado  
3. Instalar con opciones por defecto  
4. Verificar instalación en PowerShell con los comandos:

```
node -v
npm -v
```

### Instalar dependencias del back-end:
1. Dentro de la carpeta back-end, abrir la terminal integrada

```
npm i express
npm i mongoose
npm i cors
npm i body-parser
npm i dotenv
```

### Levantar el servidor:
1. Desde la terminar de Visual Studio code dentro de la carpeta back-end

```
node index.js
```
### Verificación:
1. Verificar que en la terminal se indique que el servidor está corriendo y se realizó la conexión a MongoDB Atlas.

### Ejecutar el front-end:
1. Dentro del front-end buscar el archivo login.html
2. Hacer click derecho y seleccionar Open with Live Server
3. Se abrirá la aplicación en el navegador con la ruta: http://127.0.0.1:5500/front-end/login.html

---

## Estructura del proyecto
```
├── back-end/
│   ├── models/
│   │   ├── pei.model.js
│   │   ├── programa.model.js
│   │   └── usuario.model.js
│   ├── node_modules/
│   ├── routes/
│   │   ├── pei.route.js
│   │   ├── programa.route.js
│   │   └── usuario.route.js
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── front-end/
│   ├── components/
│   │   ├── navbar-admin.html
│   │   └── navbar-docente.html
│   ├── css/
│   │   ├── dashboard.css
│   │   ├── estilo.css
│   │   ├── login.css
│   │   └── navbar.css
│   ├── img/
│   │   ├── logo-azul.png
│   │   ├── logo-blanco.png
│   │   ├── logo-outline-nombre.png
│   │   ├── logo-outline.png
│   │   └── perfil.png
│   ├── js/
│   │   ├── dashboard-admin.js
│   │   ├── dashboard-docente.js
│   │   ├── load-navbar-admin.js
│   │   ├── load-navbar-docente.js
│   │   ├── login.js
│   │   ├── pei-avance.js
│   │   ├── pei-editar.js
│   │   ├── pei-listar.js
│   │   ├── pei-registrar.js
│   │   ├── programa-editar.js
│   │   ├── programa-listar.js
│   │   ├── programa-registrar.js
│   │   ├── usuario-editar.js
│   │   ├── usuario-listar.js
│   │   └── usuario-registrar.js
│   ├── dashboard-admin.html
│   ├── dashboard-docente.html
│   ├── login.html
│   ├── pei-avance.html
│   ├── pei-editar.html
│   ├── pei-listar.html
│   ├── pei-registrar.html
│   ├── programa-editar.html
│   ├── programa-listar.html
│   ├── programa-registrar.html
│   ├── usuario-editar.html
│   ├── usuario-listar.html
│   └── usuario-registrar.html
│
├── requerimientos/
│   ├── functional-requirements.md
│   └── non-functional-requirements.md
│
├── .gitignore
└── README.md
```

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


### Convención de mensajes de commit
Los mensajes de commit deben seguir esta estructura:

[tipo]: <mensaje breve de lo que se está cambiando>

**Ejemplo:**
[new]: agrega inicio de sesión
[fixed]: corrección contraste de colores en formularios
[updated]: actualización de requerimientos funcionales

---

## Estrategia de ramas (branches)

Se utiliza el modelo **Git Flow** simplificado:
- `main`: contiene versiones estables y liberadas.
- `feature/*`: desarrollo de características específicas.
- `fix/*`: corrección de errores.
- `docs/*`: cambios en documentación.
  
**Ejemplo:**

feature/formulario-inicio-sesion

fix/barra-navegación

docs/readme-actualización

---

## Documentación de requerimientos
- [Requerimientos funcionales](/requerimientos/functional-requirements.md)  
- [Requerimientos no funcionales](/requerimientos/non-functional-requirements.md)  

