import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import eliminarCategoria from './eliminarCategoriasController.js';

function categoriasController() {
  const tbody = document.querySelector("#categorias_table_body");
  if (!tbody) return;

  const listarCategorias = async () => {
    try {
      const request = await fetchWithAuth("http://localhost:3000/api/categorias");
      const responseData = await request.json();
      if (!responseData.success) throw new Error(responseData.message);

      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }

      if (responseData.data.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', '4');
        td.textContent = 'No hay categorías para mostrar.';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
      }
      
      responseData.data.forEach(categoria => {
        const tr = document.createElement('tr');
        tr.setAttribute('id', `categoria_row_${categoria.id}`);
        
        const celdas = [categoria.id, categoria.nombre, categoria.descripcion];
        celdas.forEach(texto => {
          const td = document.createElement('td');
          td.textContent = texto || 'N/A';
          tr.appendChild(td);
        });

        const tdAcciones = document.createElement('td');
        const btnEditar = document.createElement('a');
        btnEditar.textContent = "Editar";
        btnEditar.setAttribute('href', `#editar_categoria/${categoria.id}`);
        btnEditar.classList.add('btn', 'btn_secondary');
        
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add('btn', 'btn_danger');
        btnEliminar.addEventListener('click', () => eliminarCategoria(categoria.id));
        
        tdAcciones.append(btnEditar, btnEliminar);
        tr.appendChild(tdAcciones);
        
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error al listar categorías:", error);
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Error: ${error.message}</td></tr>`;
    }
  };
  
  listarCategorias();
}

export default categoriasController;