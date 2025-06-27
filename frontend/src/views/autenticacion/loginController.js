// frontend/src/views/autenticacion/loginController.js
import crearHeader from '../../components/header.js';
import Swal from 'sweetalert2'; // Importamos SweetAlert para unificar las alertas

function loginController() {
  const form = document.querySelector("#form_login");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = document.querySelector("#usuario").value;
    const contrasena = document.querySelector("#contrasena").value;

    if (!usuario || !contrasena) {
      // Usamos SweetAlert para una mejor experiencia de usuario
      return Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.'
      });
    }

    try {
      const request = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
      });

      const responseData = await request.json();

      if (!request.ok) {
        throw new Error(responseData.message || "Credenciales incorrectas");
      }

      // Guardamos los tokens en localStorage
      localStorage.setItem("accessToken", responseData.data.accessToken);
      localStorage.setItem("refreshToken", responseData.data.refreshToken);

      // ✨ ¡CAMBIO CLAVE! Guardamos el rol del usuario en localStorage ✨
      localStorage.setItem("userRole", responseData.data.rol);

      // La función crearHeader() debería leer el rol y adaptarse,
      // pero por ahora la dejamos como está.
      crearHeader();

      // Redireccionamos al menú principal
      location.hash = "#menu";

    } catch (error) {
      console.error("❌ Error en login:", error);
      // Mostramos el error con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: error.message
      });
    }
  });
}

export default loginController;
