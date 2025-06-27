import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import eliminarAutor from './eliminarAutorController.js';

function autorController() {
  const tbody = document.querySelector("#autores_table_body");
  if (!tbody) return;

  const listarAutores = async () => {
    try {
      const request = await fetchWithAuth("http://localhost:3000/api/autores");
      const responseData = await request.json();
      if (!responseData.success) throw new Error(responseData.message);

      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }

      if (responseData.data.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', '4');
        td.textContent = 'No hay autores para mostrar.';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
      }
      
      responseData.data.forEach(autor => {
        const tr = document.createElement('tr');
        tr.setAttribute('id', `autor_row_${autor.id}`);
        const celdas = [autor.id, autor.nombre, autor.nacionalidad];
        celdas.forEach(texto => {
          const td = document.createElement('td');
          td.textContent = texto || 'N/A';
          tr.appendChild(td);
        });
        
        const tdAcciones = document.createElement('td');
        tdAcciones.className = 'actions-cell';
        const btnEditar = document.createElement('a');
        btnEditar.textContent = "Editar";
        btnEditar.setAttribute('href', `#editar_autor/${autor.id}`);
        btnEditar.classList.add('btn', 'btn_secondary');
        
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add('btn', 'btn_danger');
        btnEliminar.addEventListener('click', () => eliminarAutor(autor.id));
        
        tdAcciones.append(btnEditar, btnEliminar);
        tr.appendChild(tdAcciones);
        
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error al listar autores:", error);
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Error: ${error.message}</td></tr>`;
    }
  };
  
  listarAutores();
}

export default autorController;