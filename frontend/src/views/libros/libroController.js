import fetchWithAuth from '../../helpers/fetchWithAuth.js';

function libroController() {
  const tbody = document.querySelector("#libros_table_body");
  if (!tbody) {
    console.error("No se encontró el cuerpo de la tabla para los libros.");
    return;
  }

  const listarLibros = async () => {
    try {
      // Usamos nuestro ayudante en lugar del fetch nativo
      const request = await fetchWithAuth("http://localhost:3000/api/libros");

      const responseData = await request.json();

      if (!request.ok) {
        throw new Error(responseData.message || "No se pudieron cargar los libros");
      }

      // Limpiamos la tabla de forma segura
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }

      if (!responseData.data || responseData.data.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', '5');
        td.style.textAlign = 'center';
        td.textContent = 'No hay libros para mostrar.';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
      }

      // Creamos las filas programáticamente
      responseData.data.forEach(libro => {
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = libro.id;

        const tdTitulo = document.createElement('td');
        tdTitulo.textContent = libro.titulo;

        const tdAnio = document.createElement('td');
        tdAnio.textContent = libro.anio_publicacion || 'N/A';

        const tdGenero = document.createElement('td');
        tdGenero.textContent = libro.genero || 'N/A';

        const tdAcciones = document.createElement('td');
        tdAcciones.classList.add('actions');

        const btnEditar = document.createElement('a');
        btnEditar.textContent = "Editar";
        btnEditar.href = `#editar_libro/${libro.id}`;
        btnEditar.classList.add('btn', 'btn_secondary');

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add('btn', 'btn_danger');
        btnEliminar.dataset.id = libro.id;

        tdAcciones.append(btnEditar, btnEliminar);
        tr.append(tdId, tdTitulo, tdAnio, tdGenero, tdAcciones);
        tbody.appendChild(tr);
      });

    } catch (error) {
      console.error("❌ Error al listar libros:", error);
      if (error.message !== "Tu sesión ha expirado. Por favor, inicia sesión de nuevo.") {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Error: ${error.message}</td></tr>`;
      }
    }
  };

  listarLibros();
}

export default libroController;