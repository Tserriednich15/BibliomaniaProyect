import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

const API_URL = "http://localhost:3000/api";

async function handlePagarMulta(multaId, tr) {
  const confirmacion = await Swal.fire({
    title: 'Confirmar Pago',
    text: `¿Estás seguro de que deseas marcar la multa #${multaId} como pagada?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, ¡Pagada!',
    cancelButtonText: 'Cancelar'
  });

  if (!confirmacion.isConfirmed) return;

  Swal.showLoading();

  try {
    const response = await fetchWithAuth(`${API_URL}/multas/${multaId}/pagar`, {
      method: 'PUT'
    });
    
    const responseData = await response.json();
    if (!response.ok) throw new Error(responseData.message);
    
    await Swal.fire('¡Éxito!', 'La multa ha sido marcada como pagada.', 'success');
    
    tr.classList.add('fade-out');
    tr.addEventListener('transitionend', () => tr.remove());

  } catch (error) {
    Swal.fire('Error', `No se pudo procesar el pago: ${error.message}`, 'error');
  }
}

function multasController() {
  const tbody = document.querySelector("#multas_table_body");
  if (!tbody) return;

  const style = document.createElement('style');
  style.innerHTML = `.fade-out { opacity: 0; transform: scale(0.9); transition: all 0.5s ease; }`;
  document.head.appendChild(style);

  const listarMultas = async () => {
    try {
      const request = await fetchWithAuth(`${API_URL}/multas`);
      const responseData = await request.json();
      if (!responseData.success) throw new Error(responseData.message);

      tbody.innerHTML = '';

      if (responseData.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">No hay multas registradas.</td></tr>`;
        return;
      }
      
      responseData.data.forEach(multa => {
        const tr = document.createElement('tr');
        const fechaCreacion = new Date(multa.created_at).toLocaleDateString('es-CO');
        const montoFormateado = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(multa.monto);
        
        const estadoClass = multa.estado === 'pendiente' ? 'text-red-500 font-bold' : 'text-green-500 font-bold';

        tr.innerHTML = `
          <td data-label="ID">${multa.id}</td>
          <td data-label="Visitante">${multa.visitante_nombre || 'N/A'}</td>
          <td data-label="Monto">${montoFormateado}</td>
          <td data-label="Préstamo ID">${multa.prestamo_id || 'N/A'}</td>
          <td data-label="Fecha Creación">${fechaCreacion}</td>
          <td data-label="Estado"><span class="${estadoClass}">${multa.estado}</span></td>
        `;

        const accionesCell = document.createElement('td');
        accionesCell.dataset.label = "Acciones";

        if (multa.estado === 'pendiente') {
          const btnPagar = document.createElement('button');
          btnPagar.textContent = 'Marcar como Pagada';
          btnPagar.classList.add('btn', 'btn_success');
          btnPagar.addEventListener('click', () => handlePagarMulta(multa.id, tr));
          accionesCell.appendChild(btnPagar);
        } else {
            accionesCell.textContent = '---';
        }
        
        tr.appendChild(accionesCell);
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error al listar multas:", error);
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-red-500">Error al cargar las multas: ${error.message}</td></tr>`;
    }
  };
  
  listarMultas();
}

export default multasController;
