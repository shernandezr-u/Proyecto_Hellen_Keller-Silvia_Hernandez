document.addEventListener("DOMContentLoaded", () => {

  const formulario = document.getElementById("loginFormulario");
  const usuarioInput = document.getElementById("usuario");
  const contraseniaInput = document.getElementById("contrasenia");
  const togglePassword = document.getElementById("togglePassword");

  // Ocultar error cuando el usuario hace click de nuevo en el input
  function limpiarErrorInput(input) {
    input.addEventListener("click", () => {
      input.classList.remove("is-invalid");
      input.classList.remove("is-valid");
    });
  }

  limpiarErrorInput(usuarioInput);
  limpiarErrorInput(contraseniaInput);

  // Ver/ocultar contraseña

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valido = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación formato del correo
    if (!emailRegex.test(usuarioInput.value.trim())) {
      usuarioInput.classList.add("is-invalid");
      valido = false;
    } else {
      usuarioInput.classList.add("is-valid");
    }

    // Validación contraseña vacía
    if (contraseniaInput.value.trim() === "") {
      contraseniaInput.classList.add("is-invalid");
      valido = false;
    } else {
      contraseniaInput.classList.add("is-valid");
    }

    if (!valido) return;

    // Si es válido - enviar al servidor
    try {
        const res = await fetch("/usuarios/login-encriptado", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            correo: usuarioInput.value.trim(),
            contrasenia: contraseniaInput.value.trim(),
            }),
        });

        console.log("STATUS:", res.status);

        const text = await res.text();
        console.log("RESPUESTA RAW:", text);

        let data = {};
        try { data = JSON.parse(text); }
        catch { console.log("❌ No es JSON válido"); }

        if (!res.ok || !data.success) {
            Swal.fire({
            icon: "error",
            title: "Usuario o contraseña inválida",
            text: "Por favor verifique sus credenciales.",
            confirmButtonColor: "#0b3c5d",
            });
            return;
        }

        /*const data = await res.json();

        if (!res.ok || !data.success) {
            Swal.fire({
                icon: "error",
                title: "Usuario o contraseña inválida",
                text: "Por favor verifique sus credenciales.",
                confirmButtonColor: "#0b3c5d",
        });
            return;
      }*/

        // Login exitoso → redirigir según rol
        const user = data.usuario;
        sessionStorage.setItem("usuario", JSON.stringify(user));

        if (user.rol === "administrador") {
            window.location.href = "/admin/inicio.html";
        } 
        else if (user.rol === "docente") {
            window.location.href = "/docente/inicio.html";
        } 
        else {
            window.location.href = "/inicio.html";
        }

        } catch (error) {
        Swal.fire("Error", "No se pudo conectar con el servidor", "error");
        }
    });
    });
