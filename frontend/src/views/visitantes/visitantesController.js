import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { eliminarVisitante } from './eliminarVisitanteController.js';

function visitantesController() {
  const tbody = document.querySelector("#visitantes_table_body");
  if (!tbody) return;

  const listarVisitantes = async () => {
    try {
      const request = await fetchWithAuth("http://localhost:3000/api/visitantes");
      const responseData = await request.json();
      if (!responseData.success) throw new Error(responseData.message);

      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }

      if (responseData.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7">No hay visitantes para mostrar.</td></tr>`;
        return;
      }

      responseData.data.forEach(visitante => {
        const tr = document.createElement('tr');
        tr.setAttribute('id', `visitante_row_${visitante.id}`);

        const celdas = [visitante.id, visitante.cedula, visitante.nombre, visitante.apellido, visitante.correo, visitante.telefono];
        celdas.forEach(texto => {
          const td = document.createElement('td');
          td.textContent = texto || 'N/A';
          tr.appendChild(td);
        });

        const tdAcciones = document.createElement('td');
        tdAcciones.className = 'actions-cell';
        const btnEditar = document.createElement('a');
        btnEditar.textContent = "Editar";
        btnEditar.setAttribute('href', `#editar_visitante/${visitante.id}`);
        btnEditar.classList.add('btn', 'btn_secondary');

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add('btn', 'btn_danger');
        btnEliminar.addEventListener('click', () => eliminarVisitante(visitante.id));

        tdAcciones.append(btnEditar, btnEliminar);
        tr.appendChild(tdAcciones);

        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error al listar visitantes:", error);
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Error: ${error.message}</td></tr>`;
    }
  };

  listarVisitantes();
}

export default visitantesController;