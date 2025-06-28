// Importamos la nueva función de validación junto a las existentes
import { setAuthTokens } from '../../helpers/fetchWithAuth.js';
import { mostrarError } from '../../helpers/notificaciones_helper.js'; // [cite: 60, 61, 62]
import { validarFormularioLogin } from '../../helpers/validacion_helper.js';

function loginController() {
  const form = document.querySelector("#form_login");
  if (!form) return; // [cite: 2]

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Usamos nuestra nueva función para validar el formulario.
    // Si no es válido, la función ya habrá mostrado los errores en los campos.
    if (!validarFormularioLogin(form)) {
      return; // Detenemos la ejecución si hay errores.
    }
    
    // Si la validación pasa, continuamos con la lógica de envío.
    const usuario = document.querySelector("#usuario").value;
    const contrasena = document.querySelector("#contrasena").value;

    try {
      const request = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }), // [cite: 3]
      });

      const responseData = await request.json();

      if (!request.ok || !responseData.success) {
        throw new Error(responseData.message || "Credenciales incorrectas");
      }

      setAuthTokens(responseData.data);
      localStorage.setItem("userRole", responseData.data.rol);
      location.hash = "#menu";

    } catch (error) {
      console.error("❌ Error en login:", error);
      mostrarError('Error de inicio de sesión', error.message); // [cite: 4, 61, 62]
    }
  });
}

export default loginController;