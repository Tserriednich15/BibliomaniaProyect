import Swal from "sweetalert2";

export default function mostrarRegistro(main) {
  console.log("✅ Ejecutando formulario de registro");

  main.innerHTML = "";

  const section = document.createElement("section");
  section.classList.add("registro_section");

  const title = document.createElement("h2");
  title.textContent = "Registro de Usuario";

  const form = document.createElement("form");
  form.id = "form_register";

  // Usuario
  const labelUser = document.createElement("label");
  labelUser.setAttribute("for", "usuario");
  labelUser.textContent = "Usuario";

  const inputUser = document.createElement("input");
  inputUser.type = "text";
  inputUser.id = "usuario";
  inputUser.required = true;

  // Contraseña
  const labelPass = document.createElement("label");
  labelPass.setAttribute("for", "contrasena");
  labelPass.textContent = "Contraseña";

  const inputPass = document.createElement("input");
  inputPass.type = "password";
  inputPass.id = "contrasena";
  inputPass.required = true;

  // Rol
  const labelRol = document.createElement("label");
  labelRol.setAttribute("for", "rol_id");
  labelRol.textContent = "Rol ID";

  const inputRol = document.createElement("input");
  inputRol.type = "number";
  inputRol.id = "rol_id";
  inputRol.required = true;

  const boton = document.createElement("button");
  boton.type = "submit";
  boton.textContent = "Registrar";

  form.append(labelUser, inputUser, labelPass, inputPass, labelRol, inputRol, boton);
  section.append(title, form);
  main.appendChild(section);

  // Enviar
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: inputUser.value,
          contrasena: inputPass.value,
          rol_id: parseInt(inputRol.value),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return Swal.fire("Error", data.message || "No se pudo registrar", "error");
      }

      Swal.fire("Registro exitoso", "Usuario creado correctamente", "success").then(() => {
        window.location.href = "login.html";
      });
    } catch (error) {
      console.error("❌ Error en registro:", error);
      Swal.fire("Error", "No se pudo conectar al servidor", "error");
    }
  });
}
