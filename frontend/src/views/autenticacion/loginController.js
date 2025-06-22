import crearHeader from '../../components/header.js';

function loginController() {
  const form = document.querySelector("#form_login");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = document.querySelector("#usuario").value;
    const contrasena = document.querySelector("#contrasena").value;

    if (!usuario || !contrasena) {
      return alert("Por favor, completa todos los campos.");
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

      const accessToken = responseData.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", responseData.data.refreshToken);

      crearHeader();

      // --- REDIRECCIÓN CORREGIDA ---
      // Usamos '#menu' sin la barra para ser consistentes.
      location.hash = "#menu";

    } catch (error) {
      console.error("❌ Error en login:", error);
      alert(error.message);
    }
  });
}

export default loginController;