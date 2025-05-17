import { cargarLectura } from "../models/lecturaModel.js";
import { mostrarLectura } from "../views/lecturaView.js";

export default function controladorLectura() {
  document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");
    const id = params.get("id");

    console.log("Parámetros URL:", params.toString());
    console.log("Tipo:", tipo);
    console.log("ID:", id);

    if (tipo && id) {
      try {
        const datos = await cargarLectura(tipo, id);
        if (datos) {
          mostrarLectura(datos);
        } else {
          console.error("No se pudieron cargar los datos");
        }
      } catch (error) {
        console.error("Error en el controlador de lectura:", error);
      }
    } else {
      console.error("Faltan parámetros en la URL");
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    console.log("Tipo recibido", params.get("tipo"));
    console.log("ID recibido", params.get("id"));
    
  });
}