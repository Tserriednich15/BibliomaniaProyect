// frontend/src/controllers/prestamosController.js

import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

const API_URL = "http://localhost:3000/api";

/**
 * Maneja el proceso de devolución de un libro, desde la confirmación hasta la actualización de la UI.
 * @param {string} prestamoId - El ID del préstamo a devolver.
 * @param {string} libroTitulo - El título del libro para mostrar en la confirmación.
 * @param {HTMLElement} tr - La fila (<tr>) de la tabla que se va a eliminar.
 */
async function handleDevolucion(prestamoId, libroTitulo, tr) {
    // 1. Usar SweetAlert2 para una confirmación más clara
    const confirmacion = await Swal.fire({
        title: 'Confirmar Devolución',
        html: `¿Estás seguro de devolver el libro <b>${libroTitulo}</b>?`, // Usamos html para negrita
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡Devolver!',
        cancelButtonText: 'Cancelar'
    });

    if (!confirmacion.isConfirmed) return;

    // 2. Mostrar un indicador de carga
    Swal.showLoading();

    try {
        // 3. LLAMAR A LA NUEVA RUTA CON EL MÉTODO POST
        const response = await fetchWithAuth(`${API_URL}/prestamos/${prestamoId}/devolver`, {
            method: 'POST' 
        });
        
        const responseData = await response.json();

        if (!response.ok) {
            // Si el backend envía un error, lo mostramos
            throw new Error(responseData.message || "Error desconocido del servidor.");
        }
        
        // 4. Mostrar el mensaje de éxito del backend (que puede incluir info de la multa)
        await Swal.fire({
            title: '¡Devolución Exitosa!',
            text: responseData.message, // Mensaje dinámico desde el backend
            icon: 'success',
            timer: 3000,
            timerProgressBar: true
        });

        // 5. MEJORA DE UX: Eliminar la fila de la tabla con una animación suave
        tr.classList.add('fade-out');
        tr.addEventListener('transitionend', () => {
            tr.remove();
            // Comprobar si la tabla quedó vacía
            const tbody = document.querySelector("#prestamos_table_body");
            if (tbody && tbody.children.length === 0) {
                 tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4">¡No hay préstamos activos!</td></tr>`;
            }
        });
        

    } catch (error) {
        Swal.fire('Error', `No se pudo registrar la devolución: ${error.message}`, 'error');
    }
}

/**
 * Función principal del controlador de la vista de préstamos.
 */
function prestamosController() {
    const tbody = document.querySelector("#prestamos_table_body");
    if (!tbody) return;

    // Agregamos un estilo para la animación de fade-out
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
            // Llama a la ruta que ahora solo trae préstamos activos
            const request = await fetchWithAuth(`${API_URL}/prestamos`);
            const responseData = await request.json();
            if (!responseData.success) throw new Error(responseData.message);

            tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">Cargando...</td></tr>';

            if (responseData.data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4">No hay préstamos activos en este momento.</td></tr>`;
                return;
            }
            
            tbody.innerHTML = ''; // Limpiamos la tabla antes de llenarla

            responseData.data.forEach(prestamo => {
                const tr = document.createElement('tr');
                // Formateamos las fechas para mejor lectura
                const fechaPrestamo = new Date(prestamo.fecha_prestamo).toLocaleDateString('es-CO');
                const fechaVencimiento = new Date(prestamo.fecha_vencimiento).toLocaleDateString('es-CO');

                // Llenamos las celdas con los datos correctos
                tr.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${prestamo.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${prestamo.libro_titulo || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${prestamo.visitante_nombre || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${fechaPrestamo}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${fechaVencimiento}</td>
                `;

                // Creamos la celda de acciones y el botón
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