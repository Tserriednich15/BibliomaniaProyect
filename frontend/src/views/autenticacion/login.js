// src/scripts/login.js
// import Swal from "sweetalert2"; // Asegúrate de tener sweetalert2 instalado o importado correctamente
import { api } from "../../helpers/api.js"; // Usaremos nuestro helper para las llamadas a la API

console.log("✅ login.js cargado");

// Cambiamos el nombre a initLogin y usamos "export" en lugar de "export default" para ser consistentes.
// Recibimos "app" que es el contenedor principal que nos pasa el router.
export function initLogin(app) {
    console.log("✅ Ejecutando initLogin");

    // Ahora "app" es el contenedor principal, no es undefined.
    // El router ya lo limpia, así que esta línea no es estrictamente necesaria, pero no hace daño.
    app.innerHTML = "";

    const section = document.createElement("section");
    section.classList.add("login_section");

    const title = document.createElement("h2");
    title.textContent = "Iniciar Sesión";

    const form = document.createElement("form");
    form.id = "form_login";

    // ... (El resto de la creación de tu formulario es perfecta, no hay que cambiarla) ...
    const labelUser = document.createElement("label");
    labelUser.setAttribute("for", "usuario");
    labelUser.textContent = "Usuario";

    const inputUser = document.createElement("input");
    inputUser.type = "text";
    inputUser.id = "usuario";
    inputUser.required = true;

    const labelPass = document.createElement("label");
    labelPass.setAttribute("for", "contrasena");
    labelPass.textContent = "Contraseña";

    const inputPass = document.createElement("input");
    inputPass.type = "password";
    inputPass.id = "contrasena";
    inputPass.required = true;

    const boton = document.createElement("button");
    boton.type = "submit";
    boton.textContent = "Iniciar sesión";

    form.append(labelUser, inputUser, labelPass, inputPass, boton);
    section.append(title, form);
    app.appendChild(section); // Añadimos la sección al contenedor principal 'app'

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userData = {
            usuario: inputUser.value,
            contrasena: inputPass.value,
        };

        try {
            // Usamos nuestro helper 'api.js' que ya maneja headers y la URL base
            const response = await api.post('auth/login', userData);

            // Guardar tokens
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            // Usamos SweetAlert y luego redirigimos con hash
            Swal.fire("Bienvenido", `Hola ${userData.usuario}`, "success").then(() => {
                // MUY IMPORTANTE: En una SPA, navegamos cambiando el hash, no recargando la página.
                location.hash = "#/menu";
            });

        } catch (error) {
            console.error("❌ Error en login:", error);
            Swal.fire("Error", error.message || "Credenciales incorrectas", "error");
        }
    });
}