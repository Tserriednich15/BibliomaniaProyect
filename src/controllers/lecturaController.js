// import { cargarLectura } from "../models/lecturaModel.js";
// import { mostrarLectura } from "../views/lecturaView.js";

// document.addEventListener("DOMContentLoaded", async () => {
//   const params = new URLSearchParams(window.location.search);
//   const tipo = params.get("tipo");
//   const id = params.get("id");

//   if (!tipo || !id) {
//     console.error("Faltan parámetros en la URL. Se esperan 'tipo' e 'id'.");
//     return;
//   }

//   console.log("Parámetros recibidos:", { tipo, id });

//   const data = await cargarLectura(tipo, id);
//   if (data) {
//     mostrarLectura(data);
//   } else {
//     console.error("No se pudo cargar la información del título seleccionado.");
//   }
// });

// src/controllers/lecturaController.js
import { cargarLectura } from "../models/lecturaModel.js";
import { mostrarLectura } from "../views/lecturaView.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get("tipo");
  const id = params.get("id");

  if (!tipo || !id) {
    console.error("Faltan parámetros en la URL. Se esperan 'tipo' e 'id'.");
    return;
  }
  
  console.log("Parámetros recibidos:", { tipo, id });
  
  const data = await cargarLectura(tipo, id);
  if (data) {
    mostrarLectura(data);
  } else {
    console.error("No se pudo cargar la información del título seleccionado.");
  }
});