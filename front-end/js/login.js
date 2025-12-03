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

  // Toggle mostrar/ocultar contraseña
  togglePassword.addEventListener("click", function () {
    const type = contraseniaInput.getAttribute("type") === "password" ? "text" : "password";
    contraseniaInput.setAttribute("type", type);

    const icon = togglePassword.querySelector("i");
      if (icon) {
        icon.classList.toggle("bi-eye");
        icon.classList.toggle("bi-eye-slash");
      }
    });

  // Manejar el submit del formulario
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
        const res = await fetch("http://localhost:3000/usuarios/login-encriptado", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            correo: usuarioInput.value.trim(),
            contrasenia: contraseniaInput.value.trim(),
            }),
        });

        console.log("STATUS:", res.status);

        const data = await res.json();

        if (!res.ok || !data.success) {
            Swal.fire({
                icon: "error",
                title: "Usuario o contraseña inválida",
                text: "Por favor verifique sus credenciales.",
        });
            return;
      }

      // Login exitoso redirigir según rol
      const user = data.usuario;
      sessionStorage.setItem("usuario", JSON.stringify(user));

      if (user.rol === "Administrador") {
        window.location.href = "dashboard-admin.html";
      } 
      else if (user.rol === "Docente/Terapeuta") {
        window.location.href = "dashboard-docente.html";
      } 
      else {
        window.location.href = "login.html";
      }
      } catch (error) {
        Swal.fire("Error", "No se pudo conectar con el servidor", "error");
      }
  });
});
