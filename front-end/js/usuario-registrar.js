const inputNombre = document.getElementById("txtNombre");
const inputCedula = document.getElementById("txtCedula");
const inputCorreo = document.getElementById("txtCorreo");
const inputCelular = document.getElementById("txtCelular");
const inputDireccion = document.querySelector("#txtDireccion");
const inputRol = document.querySelector("#txtRol");
const inputContrasenia = document.querySelector("#txtContrasenia");
const btnGuardar = document.querySelector("#btnGuardar");

const inputsRequeridos = document.querySelectorAll("input[required]");

// Validar campos antes de registrar
function validar() {
    let error = false;
    inputsRequeridos.forEach(input => {
        if (input.value.trim() === "") {
            error = true;
        }
    });
    
    if (inputRol.value === "" || inputRol.selectedIndex === 0) {
        error = true;
    }

    if (error) {
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor complete todos los campos antes de continuar.",
            confirmButtonText: "Aceptar"
        });
        return;
    }

    registrarUsuario();
}

function registrarUsuario() {
    const datosNuevoUsuario = {
        correo: inputCorreo.value,
        nombre: inputNombre.value,
        cedula: inputCedula.value,
        celular: inputCelular.value,
        direccion: inputDireccion.value,
        rol: inputRol.value,
        contrasenia: inputContrasenia.value
    };

    fetch("http://localhost:3000/usuarios")
        .then(res => res.json())
        .then(listaUsuarios => {

            const correoExiste = listaUsuarios.some(u =>
                u.correo.toLowerCase() === datosNuevoUsuario.correo.toLowerCase()
            );

            const cedulaExiste = listaUsuarios.some(u =>
                u.cedula === datosNuevoUsuario.cedula
            );

            if (correoExiste) {
                Swal.fire({
                    icon: "warning",
                    title: "Correo ya registrado",
                    text: "El correo ingresado ya está en uso. Intente con otro.",
                });
                return;
            }

            if (cedulaExiste) {
                Swal.fire({
                    icon: "warning",
                    title: "Cédula ya registrada",
                    text: "La cédula ingresada ya pertenece a un usuario",
                });
                return;
            }

            // Registrar solo si ambos NO existen
            return fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datosNuevoUsuario)
            });
        })
        .then(response => {
            if (response && response.ok) {
                Swal.fire({
                    title: "Usuario registrado con éxito",
                    text: "El usuario ha sido registrado correctamente.",
                    icon: "success"
                });
                limpiarFormulario(); 
            }
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: "No se pudo conectar con el servidor.",
                icon: "error"
            });
        });
}

function limpiarFormulario() {
    inputNombre.value = "";
    inputCedula.value = "";
    inputCorreo.value = "";
    inputCelular.value = "";
    inputDireccion.value = "";
    inputRol.selectedIndex = 0;
    inputContrasenia.value = "";
}

btnGuardar.addEventListener("click", validar);