export function mostrarLectura(data, container) {
  container.innerHTML = "";

  const titleEl = document.createElement("h1");
  titleEl.classList.add("lectura-title");
  titleEl.textContent = data.titulo;
  container.appendChild(titleEl);

  const detailContainer = document.createElement("div");
  detailContainer.classList.add("lectura-detail-container");

  const leftPanel = document.createElement("div");
  leftPanel.classList.add("lectura-left");

  const poster = document.createElement("img");
  poster.classList.add("lectura-poster");
  poster.src = data.imagen;
  poster.alt = data.titulo;
  leftPanel.appendChild(poster);

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

  const synopsisHeader = document.createElement("h2");
  synopsisHeader.classList.add("lectura-synopsis-header");
  synopsisHeader.textContent = "Sinopsis";
  container.appendChild(synopsisHeader);

  const synopsisPara = document.createElement("p");
  synopsisPara.classList.add("lectura-synopsis");
  synopsisPara.textContent = data.synopsis;
  container.appendChild(synopsisPara);

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