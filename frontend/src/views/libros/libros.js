import protegerVista from "../../scripts/protegerVista.js"
protegerVista();

const token = localStorage.getItem("accessToken");
const tablaBody = document.querySelector("#tabla_libros tbody");

export const crearFilaLibro = (libro) => {
  const fila = document.createElement("tr");

  const celdaId = document.createElement("td");
  celdaId.textContent = libro.id;

  const celdaTitulo = document.createElement("td");
  celdaTitulo.textContent = libro.titulo;

  const celdaGenero = document.createElement("td");
  celdaGenero.textContent = libro.genero || "Sin género";

  const celdaAnio = document.createElement("td");
  celdaAnio.textContent = libro.anio_publicacion || "N/A";

  const celdaDisponibles = document.createElement("td");
  celdaDisponibles.textContent = libro.cantidad_disponible;

  fila.appendChild(celdaId);
  fila.appendChild(celdaTitulo);
  fila.appendChild(celdaGenero);
  fila.appendChild(celdaAnio);
  fila.appendChild(celdaDisponibles);

  return fila;
};

const cargarLibros = async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/libros", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!respuesta.ok) {
      throw new Error("Error al obtener los libros");
    }

    const libros = await respuesta.json();

    tablaBody.innerHTML = "";

    libros.forEach((libro) => {
      const fila = crearFilaLibro(libro);
      tablaBody.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar libros:", error);
    Swal.fire("Error", error.message, "error");
  }
};

cargarLibros();