import Swal from "sweetalert2";

console.log("✅ login.js cargado");

export default function mostrarLogin(main) {
  console.log("✅ Ejecutando login desde main.js");

  main.innerHTML = "";

  const section = document.createElement("section");
  section.classList.add("login_section");

  const title = document.createElement("h2");
  title.textContent = "Iniciar Sesión";

  const form = document.createElement("form");
  form.id = "form_login";

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
  main.appendChild(section);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: inputUser.value,
          contrasena: inputPass.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return Swal.fire("Error", data.message || "Credenciales incorrectas", "error");
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      Swal.fire("Bienvenido", `Hola ${inputUser.value}`, "success").then(() => {
        window.location.href = "views/visitantes/menu.html";
      });
    } catch (error) {
      console.error("❌ Error en login:", error);
      Swal.fire("Error", "No se pudo conectar al servidor", "error");
    }
  });
}