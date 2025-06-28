import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

const API_URL = "http://localhost:3000/api";

async function handleDevolucion(prestamoId, libroTitulo, tr) {
    const confirmacion = await Swal.fire({
        title: 'Confirmar Devolución',
        html: `¿Estás seguro de devolver el libro <b>${libroTitulo}</b>?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡Devolver!',
        cancelButtonText: 'Cancelar'
    });

    if (!confirmacion.isConfirmed) return;

    Swal.showLoading();

    try {
        const response = await fetchWithAuth(`${API_URL}/prestamos/${prestamoId}/devolver`, {
            method: 'POST' 
        });
        
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || "Error desconocido del servidor.");
        }
        
        await Swal.fire({
            title: '¡Devolución Exitosa!',
            text: responseData.message,
            icon: 'success',
            timer: 3000,
            timerProgressBar: true
        });

        tr.classList.add('fade-out');
        tr.addEventListener('transitionend', () => {
            tr.remove();
            const tbody = document.querySelector("#prestamos_table_body");
            if (tbody && tbody.children.length === 0) {
                 tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4">¡No hay préstamos activos!</td></tr>`;
            }
        });
        

    } catch (error) {
        Swal.fire('Error', `No se pudo registrar la devolución: ${error.message}`, 'error');
    }
}

function prestamosController() {
    const tbody = document.querySelector("#prestamos_table_body");
    if (!tbody) return;

    const style = document.createElement('style');
    style.innerHTML = `
      .fade-out {
        opacity: 0;
        transform: translateX(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      }
    `;
    document.head.appendChild(style);


    const listarPrestamos = async () => {
        try {
            const request = await fetchWithAuth(`${API_URL}/prestamos`);
            const responseData = await request.json();
            if (!responseData.success) throw new Error(responseData.message);

            tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">Cargando...</td></tr>';

            if (responseData.data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4">No hay préstamos activos en este momento.</td></tr>`;
                return;
            }
            
            tbody.innerHTML = '';
            
            responseData.data.forEach(prestamo => {
                const tr = document.createElement('tr');
                const fechaPrestamo = new Date(prestamo.fecha_prestamo).toLocaleDateString('es-CO');
                const fechaVencimiento = new Date(prestamo.fecha_vencimiento).toLocaleDateString('es-CO');

                tr.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${prestamo.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${prestamo.libro_titulo || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${prestamo.visitante_nombre || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${fechaPrestamo}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${fechaVencimiento}</td>
                `;

                const accionesCell = document.createElement('td');
                accionesCell.className = 'actions-cell';
                const btnDevolver = document.createElement('button');
                btnDevolver.textContent = 'Devolver';
                btnDevolver.classList.add('btn', 'btn_devolver');
                btnDevolver.addEventListener('click', () => handleDevolucion(prestamo.id, prestamo.libro_titulo, tr));
                
                accionesCell.appendChild(btnDevolver);
                tr.appendChild(accionesCell);
                
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error("Error al listar préstamos:", error);
            tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-red-500">Error al cargar los datos: ${error.message}</td></tr>`;
        }
    };
    
    listarPrestamos();
}

export default prestamosController;