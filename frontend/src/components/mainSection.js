// import { obtenerCategorias } from "../helpers/api.js";

export const crearMain = async () => {
  const main = document.createElement("main");


  const gallery = document.createElement("div");
  gallery.classList.add("gallery");
  //cardsGenero.forEach(card => gallery.appendChild(card));
  main.appendChild(gallery);

  return main;
};

async function mostrarCategorias() {
  // const categorias = await obtenerCategorias();
}


mostrarCategorias();