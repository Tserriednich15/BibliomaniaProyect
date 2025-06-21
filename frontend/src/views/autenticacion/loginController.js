function loginController() {

  // Seleccionamos el formulario que ya fue cargado por el router
  const form = document.querySelector("#form_login");
  if (!form) {
    console.error("El formulario de login no se encontró en el DOM.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtenemos los valores directamente de los inputs
    const usuario = document.querySelector("#usuario").value;
    const contrasena = document.querySelector("#contrasena").value;

    // Validaciones básicas del lado del cliente
    if (!usuario || !contrasena) {
      alert("Por favor, completa todos los campos.");
      // Swal.fire("Atención", "Por favor, completa todos los campos.", "warning");
      return;
    }

    try {
      // Hacemos el fetch directamente, como el instructor
      const request = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contrasena }),
      });

      const response = await request.json();

      if (!request.ok) {
        // Si la respuesta no es 2xx, el backend envió un error
        throw new Error(response.message || "Credenciales incorrectas");
      }

      // Guardamos los tokens
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // Redirigimos al menú principal
      location.hash = "#/menu";

    } catch (error) {
      console.error("❌ Error en login:", error);
      alert(error.message); // Muestra el mensaje de error del backend
      // Swal.fire("Error", error.message, "error");
    }
  });
}

export default loginController;