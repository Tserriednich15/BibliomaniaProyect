import { fetchData } from "../utils/fetchData.js";
import { obtenerDatosPorGenero } from "../utils/obtenerDatos.js";

async function obtenerGeneroPorNombre(tipo, nombre) {
  // Define el endpoint dependiendo del tipo
  const url = tipo === "manga"
    ? "https://api.jikan.moe/v4/genres/manga"
    : "https://api.jikan.moe/v4/genres/anime";
  try {
    const res = await fetchData(url);
    if (!res || !res.data) {
      console.error("No se pudieron obtener los géneros dinámicos para", tipo);
      return null;
    }
    // Busca el género cuya propiedad 'name' coincida (ignorando mayúsculas)
    return res.data.find(g => g.name.toLowerCase() === nombre.toLowerCase());
  } catch (error) {
    console.error("Error al obtener géneros dinámicos:", error);
    return null;
  }
}

export async function initCategoriasController() {
  const query = new URLSearchParams(window.location.search);
  const genero = query.get("genero");
  const tipo = query.get("tipo");

  // Obtenemos el objeto del género dinámicamente
  let generoObj = await obtenerGeneroPorNombre(tipo, genero);
  if (!generoObj || !generoObj.mal_id) {
    console.error("Género no reconocido:", genero, tipo);
    return;
  }

  // Usamos el mal_id dinámico para obtener los datos
  const id = generoObj.mal_id;
  const data = await obtenerDatosPorGenero(id, tipo);

  const gallery = document.createElement("div");
  gallery.classList.add("gallery");

  data.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    // Se asume que obtenerDatosPorGenero retorna objetos con la propiedad "image"
    img.setAttribute("src", item.image);
    img.setAttribute("alt", item.title);
    img.setAttribute("loading", "lazy");

    const contenido = document.createElement("div");
    contenido.classList.add("card_contenido");

    const h1 = document.createElement("h1");
    h1.classList.add("section_categorias");
    h1.textContent = item.title;

    contenido.appendChild(h1);
    card.appendChild(img);
    card.appendChild(contenido);

    card.addEventListener("click", () => {
      window.location.href = `lectura.html?tipo=${item.tipo}&id=${item.id}`;
    });

    gallery.appendChild(card);
  });

  const mainContent = document.querySelector("main.content");
  if (mainContent) {
    mainContent.appendChild(gallery);
  } else {
    console.error("No se encontró el contenedor main.content");
  }
}
