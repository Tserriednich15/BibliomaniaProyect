// export function mostrarLectura(data) {
//   const container = document.getElementById("app");
//   if (!container) {
//     console.error("No se encontró el contenedor de lectura con id 'app'.");
//     return;
//   }
  
//   // Limpiar contenido previo
//   container.innerHTML = "";

//   // Título
//   const titulo = document.createElement("h2");
//   titulo.textContent = data.titulo;
//   container.appendChild(titulo);

//   // Imagen de portada
//   const img = document.createElement("img");
//   img.src = data.imagen;
//   img.alt = data.titulo;
//   container.appendChild(img);

//   // Descripción
//   const descripcion = document.createElement("p");
//   descripcion.textContent = data.descripcion;
//   container.appendChild(descripcion);

//   // Información extra: episodios/capítulos, estado y géneros
//   const infoList = document.createElement("ul");

//   const episodiosItem = document.createElement("li");
//   episodiosItem.textContent = `Episodios/Capítulos: ${data.episodios}`;
//   infoList.appendChild(episodiosItem);

//   const estadoItem = document.createElement("li");
//   estadoItem.textContent = `Estado: ${data.estado}`;
//   infoList.appendChild(estadoItem);

//   if (data.generos.length > 0) {
//     const generosItem = document.createElement("li");
//     generosItem.textContent = `Géneros: ${data.generos.join(", ")}`;
//     infoList.appendChild(generosItem);
//   }

//   container.appendChild(infoList);
// }

// src/views/lecturaView.js
export function mostrarLectura(data) {
  // Usamos el contenedor "app" según lo has configurado en tu HTML
  const container = document.getElementById("app");
  if (!container) {
    console.error("No se encontró el contenedor con id 'app'.");
    return;
  }
  
  // Limpiar el contenido previo
  container.innerHTML = "";

  // Título principal
  const titleHeader = document.createElement("h1");
  titleHeader.classList.add("lectura-title");
  titleHeader.textContent = data.titulo;
  container.appendChild(titleHeader);

  // Contenedor principal para el contenido (layout en dos columnas)
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("lectura-content");

  // Panel izquierdo: imagen (poster)
  const leftPanel = document.createElement("div");
  leftPanel.classList.add("lectura-left");
  
  const poster = document.createElement("img");
  poster.src = data.imagen;
  poster.alt = data.titulo;
  poster.classList.add("lectura-poster");
  leftPanel.appendChild(poster);

  // Panel derecho: detalles en tabla
  const rightPanel = document.createElement("div");
  rightPanel.classList.add("lectura-right");

  const detailsTable = document.createElement("table");
  detailsTable.classList.add("lectura-details-table");

  // Función auxiliar para agregar filas a la tabla
  function addRow(label, value) {
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    tdLabel.textContent = label;
    tdLabel.classList.add("detail-label");
    const tdValue = document.createElement("td");
    tdValue.textContent = value;
    tdValue.classList.add("detail-value");
    tr.appendChild(tdLabel);
    tr.appendChild(tdValue);
    detailsTable.appendChild(tr);
  }
  
  addRow("Episodios/Capítulos", data.episodios);
  addRow("Estado", data.estado);
  if (data.generos.length > 0) {
    addRow("Géneros", data.generos.join(", "));
  }
  addRow("Rating", data.rating);
  addRow("Puntaje", data.score);
  addRow("Ranking", data.rank);
  addRow("Fecha de Estreno", data.start_date);
  addRow("Fecha de Finalización", data.end_date);
  addRow("Miembros", data.members);
  
  rightPanel.appendChild(detailsTable);
  
  // Agregamos ambos paneles al contenedor principal
  contentContainer.appendChild(leftPanel);
  contentContainer.appendChild(rightPanel);
  container.appendChild(contentContainer);

  // Sección de Sinopsis
  const synopsisHeader = document.createElement("h2");
  synopsisHeader.classList.add("lectura-synopsis-title");
  synopsisHeader.textContent = "Sinopsis";
  container.appendChild(synopsisHeader);
  
  const synopsisText = document.createElement("p");
  synopsisText.classList.add("lectura-synopsis");
  synopsisText.textContent = data.descripcion;
  container.appendChild(synopsisText);
}
