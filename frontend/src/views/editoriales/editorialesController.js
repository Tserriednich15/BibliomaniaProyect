import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { eliminarEditorial } from './eliminarEditorialController.js';

function editorialesController() {
  const tbody = document.querySelector("#editoriales_table_body");
  if (!tbody) return;

  const listarEditoriales = async () => {
    try {
      const request = await fetchWithAuth("http://localhost:3000/api/editoriales");
      const responseData = await request.json();
      if (!responseData.success) throw new Error(responseData.message);

      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }

      if (responseData.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">No hay editoriales para mostrar.</td></tr>`;
        return;
      }

      responseData.data.forEach(editorial => {
        const tr = document.createElement('tr');
        tr.setAttribute('id', `editorial_row_${editorial.id}`);

        const celdas = [editorial.id, editorial.nombre, editorial.pais, editorial.sitio_web];
        celdas.forEach(texto => {
          const td = document.createElement('td');
          td.textContent = texto || 'N/A';
          tr.appendChild(td);
        });

        const tdAcciones = document.createElement('td');
        tdAcciones.className = 'actions-cell';
        const btnEditar = document.createElement('a');
        btnEditar.textContent = "Editar";
        btnEditar.setAttribute('href', `#editar_editorial/${editorial.id}`);
        btnEditar.classList.add('btn', 'btn_secondary');

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add('btn', 'btn_danger');
        btnEliminar.addEventListener('click', () => eliminarEditorial(editorial.id));

        tdAcciones.append(btnEditar, btnEliminar);
        tr.appendChild(tdAcciones);

        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error al listar editoriales:", error);
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Error: ${error.message}</td></tr>`;
    }
  };

  listarEditoriales();
}

export default editorialesController;