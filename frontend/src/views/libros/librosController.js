import fetchWithAuth from '../../helpers/fetchWithAuth.js';

async function eliminarLibro(libroId) {
  if (!confirm("¿Estás seguro de que deseas eliminar este libro?")) return;
  try {
    const request = await fetchWithAuth(`http://localhost:3000/api/libros/${libroId}`, { method: 'DELETE' });
    const responseData = await request.json();
    if (!request.ok) throw new Error(responseData.message);
    alert("Libro eliminado exitosamente.");
    document.querySelector(`#libro_row_${libroId}`).remove();
  } catch (error) {
    console.error("Error al eliminar libro:", error);
    alert(error.message);
  }
}

function librosController() {
  const tbody = document.querySelector("#libros_table_body");
  if (!tbody) return;

  const listarLibros = async () => {
    try {
      const request = await fetchWithAuth("http://localhost:3000/api/libros");
      const responseData = await request.json();
      if (!responseData.success) throw new Error(responseData.message);

      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }

      if (responseData.data.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', '6');
        td.textContent = 'No hay libros para mostrar.';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
      }
      
      responseData.data.forEach(libro => {
        const tr = document.createElement('tr');
        tr.setAttribute('id', `libro_row_${libro.id}`);
        
        const celdas = [libro.id, libro.titulo, libro.autor, libro.categoria, libro.editorial];
        celdas.forEach(texto => {
          const td = document.createElement('td');
          td.textContent = texto || 'N/A';
          tr.appendChild(td);
        });

        const tdAcciones = document.createElement('td');
        const btnEditar = document.createElement('a');
        btnEditar.textContent = "Editar";
        btnEditar.setAttribute('href', `#editar_libro/${libro.id}`);
        btnEditar.classList.add('btn', 'btn_secondary');
        
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add('btn', 'btn_danger');
        btnEliminar.addEventListener('click', () => eliminarLibro(libro.id));
        
        tdAcciones.append(btnEditar, btnEliminar);
        tr.appendChild(tdAcciones);
        
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error al listar libros:", error);
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Error: ${error.message}</td></tr>`;
    }
  };
  
  listarLibros();
}

export default librosController;