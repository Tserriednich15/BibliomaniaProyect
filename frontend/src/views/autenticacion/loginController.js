import { setAuthTokens } from '../../helpers/fetchWithAuth.js';
import { mostrarError } from '../../helpers/notificaciones_helper.js';
import { validarFormularioLogin } from '../../helpers/validacion_helper.js';

function loginController() {
  const form = document.querySelector("#form_login");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validarFormularioLogin(form)) {
      return;
    }
    
    const usuario = document.querySelector("#usuario").value;
    const contrasena = document.querySelector("#contrasena").value;

    try {
      const request = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
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
      mostrarError('Error de inicio de sesión', error.message);
    }
  });
}

export default loginController;