import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { eliminarLibro } from './eliminarLibroController.js'; 

function librosController() {
  const tbody = document.querySelector("#libros_table_body");
  if (!tbody) return;

  const listarLibros = async () => {
    try {
      const request = await fetchWithAuth("http://localhost:3000/api/libros");
      const responseData = await request.json();
      if (!responseData.success) throw new Error(responseData.message);

      tbody.innerHTML = '';

      if (responseData.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center">No hay libros para mostrar.</td></tr>`;
        return;
      }
      
      responseData.data.forEach(libro => {
        const tr = document.createElement('tr');
        tr.id = `libro_row_${libro.id}`; 
        
        const celdas = [libro.id, libro.titulo, libro.autor, libro.categoria, libro.editorial];
        celdas.forEach(texto => {
          const td = document.createElement('td');
          td.textContent = texto || 'N/A';
          tr.appendChild(td);
        });

        const tdAcciones = document.createElement('td');
        tdAcciones.className = 'actions-cell';
        const btnEditar = document.createElement('a');
        btnEditar.textContent = "Editar";
        btnEditar.href = `#editar_libro/${libro.id}`;
        btnEditar.className = 'btn btn_secondary';
        
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = 'btn btn_danger';
        
        btnEliminar.addEventListener('click', () => eliminarLibro(libro.id));
        
        tdAcciones.append(btnEditar, btnEliminar);
        tr.appendChild(tdAcciones);
        
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error al listar libros:", error);
      tbody.innerHTML = `<tr><td colspan="6" class="text-center">Error: ${error.message}</td></tr>`;
    }
  };
  
  listarLibros();
}

export default librosController;