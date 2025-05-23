// export function mostrarLectura(data) {
//   const container = document.getElementById("app");
//   if (!container) {
//     console.error("No se encontró el contenedor con id 'app'.");
//     return;
//   }
  
//   container.innerHTML = "";

//   const titleHeader = document.createElement("h1");
//   titleHeader.classList.add("lectura-title");
//   titleHeader.textContent = data.titulo;
//   container.appendChild(titleHeader);

//   const contentContainer = document.createElement("div");
//   contentContainer.classList.add("lectura-content");

//   const leftPanel = document.createElement("div");
//   leftPanel.classList.add("lectura-left");
  
//   const poster = document.createElement("img");
//   poster.src = data.imagen;
//   poster.alt = data.titulo;
//   poster.classList.add("lectura-poster");
//   leftPanel.appendChild(poster);

//   const rightPanel = document.createElement("div");
//   rightPanel.classList.add("lectura-right");

//   const detailsTable = document.createElement("table");
//   detailsTable.classList.add("lectura-details-table");

//   function addRow(label, value) {
//     const tr = document.createElement("tr");
//     const tdLabel = document.createElement("td");
//     tdLabel.textContent = label;
//     tdLabel.classList.add("detail-label");
//     const tdValue = document.createElement("td");
//     tdValue.textContent = value;
//     tdValue.classList.add("detail-value");
//     tr.appendChild(tdLabel);
//     tr.appendChild(tdValue);
//     detailsTable.appendChild(tr);
//   }
  
//   addRow("Episodios/Capítulos", data.episodios);
//   addRow("Estado", data.estado);
//   if (data.generos.length > 0) {
//     addRow("Géneros", data.generos.join(", "));
//   }
//   addRow("Rating", data.rating);
//   addRow("Puntaje", data.score);
//   addRow("Ranking", data.rank);
//   addRow("Fecha de Estreno", data.start_date);
//   addRow("Fecha de Finalización", data.end_date);
//   addRow("Miembros", data.members);
  
//   rightPanel.appendChild(detailsTable);
  
//   contentContainer.appendChild(leftPanel);
//   contentContainer.appendChild(rightPanel);
//   container.appendChild(contentContainer);

//   const synopsisHeader = document.createElement("h2");
//   synopsisHeader.classList.add("lectura-synopsis-title");
//   synopsisHeader.textContent = "Sinopsis";
//   container.appendChild(synopsisHeader);
  
//   const synopsisText = document.createElement("p");
//   synopsisText.classList.add("lectura-synopsis");
//   synopsisText.textContent = data.descripcion;
//   container.appendChild(synopsisText);
// }


// src/views/lecturaView.js

// src/views/lecturaView.js
export function mostrarLectura(data, container) {
  // Limpiar el contenedor recibido
  container.innerHTML = "";

  // Título principal
  const titleEl = document.createElement("h1");
  titleEl.classList.add("lectura-title");
  titleEl.textContent = data.titulo;
  container.appendChild(titleEl);

  // Contenedor de detalles en dos columnas
  const detailContainer = document.createElement("div");
  detailContainer.classList.add("lectura-detail-container");

  // Panel izquierdo: imagen (poster)
  const leftPanel = document.createElement("div");
  leftPanel.classList.add("lectura-left");

  const poster = document.createElement("img");
  poster.classList.add("lectura-poster");
  poster.src = data.imagen;
  poster.alt = data.titulo;
  leftPanel.appendChild(poster);

  // Panel derecho: detalles en forma de tabla
  const rightPanel = document.createElement("div");
  rightPanel.classList.add("lectura-right");

  const detailsTable = document.createElement("table");
  detailsTable.classList.add("lectura-details-table");

  function addRow(label, value) {
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    tdLabel.classList.add("detail-label");
    tdLabel.textContent = label;
    const tdValue = document.createElement("td");
    tdValue.classList.add("detail-value");
    tdValue.textContent = value;
    tr.appendChild(tdLabel);
    tr.appendChild(tdValue);
    detailsTable.appendChild(tr);
  }
  
  if (data.tipo === "anime") {
    addRow("Tipo", data.tipo);
    addRow("Episodios", data.episodes);
    addRow("Estado", data.status);
    addRow("Emisión", `${data.airingFrom} – ${data.airingTo}`);
    addRow("Duración", data.duration);
    addRow("Rating", data.rating);
    addRow("Puntaje", data.score);
    addRow("Ranking", data.rank);
    addRow("Popularidad", data.popularity);
    addRow("Miembros", data.members);
    addRow("Favoritos", data.favorites);
    addRow("Temporada", `${data.season} ${data.year}`);
    addRow("Broadcast", data.broadcast);
    addRow("Producers", data.producers);
    addRow("Licensors", data.licensors);
    addRow("Studios", data.studios);
    addRow("Géneros", data.genres);
    addRow("Exp. Géneros", data.explicit_genres);
    addRow("Temas", data.themes);
    addRow("Demográficos", data.demographics);
    addRow("Opening(s)", data.openings);
    addRow("Ending(s)", data.endings);
    addRow("Externos", data.external);
    addRow("Streaming", data.streaming);
  } else if (data.tipo === "manga") {
    addRow("Tipo", data.type);
    addRow("Capítulos", data.chapters);
    addRow("Volúmenes", data.volumes);
    addRow("Estado", data.status);
    addRow("Publicación", `${data.publishing} (${data.publishedFrom} – ${data.publishedTo})`);
    addRow("Puntaje", data.score);
    addRow("Ranking", data.rank);
    addRow("Popularidad", data.popularity);
    addRow("Miembros", data.members);
    addRow("Favoritos", data.favorites);
    addRow("Autores", data.authors);
    addRow("Serializaciones", data.serializations);
    addRow("Géneros", data.genres);
    addRow("Exp. Géneros", data.explicit_genres);
    addRow("Temas", data.themes);
    addRow("Demográficos", data.demographics);
    addRow("Relaciones", data.relations);
    addRow("Externos", data.external);
  }
  
  rightPanel.appendChild(detailsTable);
  detailContainer.appendChild(leftPanel);
  detailContainer.appendChild(rightPanel);
  container.appendChild(detailContainer);

  // Sección de Sinopsis
  const synopsisHeader = document.createElement("h2");
  synopsisHeader.classList.add("lectura-synopsis-header");
  synopsisHeader.textContent = "Sinopsis";
  container.appendChild(synopsisHeader);
  
  const synopsisPara = document.createElement("p");
  synopsisPara.classList.add("lectura-synopsis");
  synopsisPara.textContent = data.synopsis;
  container.appendChild(synopsisPara);
  
  // Sección de Background (si existe)
  if (data.background) {
    const backgroundHeader = document.createElement("h2");
    backgroundHeader.classList.add("lectura-background-header");
    backgroundHeader.textContent = "Background";
    container.appendChild(backgroundHeader);
  
    const backgroundPara = document.createElement("p");
    backgroundPara.classList.add("lectura-background");
    backgroundPara.textContent = data.background;
    container.appendChild(backgroundPara);
  }
}