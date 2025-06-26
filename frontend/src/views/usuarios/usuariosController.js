// frontend/src/controllers/usuariosController.js
import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

const API_URL = "http://localhost:3000/api";

async function handleDeleteUsuario(usuarioId, usuarioNombre, tr) {
    const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        html: `Esta acción eliminará permanentemente al usuario <b>${usuarioNombre}</b>.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, ¡Eliminar!',
        cancelButtonText: 'Cancelar'
    });

    if (!confirmacion.isConfirmed) return;

    try {
        const response = await fetchWithAuth(`${API_URL}/usuarios/${usuarioId}`, {
            method: 'DELETE'
        });
        const responseData = await response.json();
        if (!response.ok) throw new Error(responseData.message);

        await Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
        tr.remove();

    } catch (error) {
        Swal.fire('Error', `No se pudo eliminar el usuario: ${error.message}`, 'error');
    }
}

function usuariosController() {
    const tbody = document.querySelector("#usuarios_table_body");
    if (!tbody) return;

    const listarUsuarios = async () => {
        try {
            const response = await fetchWithAuth(`${API_URL}/usuarios`);
            const responseData = await response.json();
            if (!responseData.success) throw new Error(responseData.message);

            tbody.innerHTML = '';
            responseData.data.forEach(usuario => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.rol}</td>
                `;

                const accionesCell = document.createElement('td');
                // No permitimos editar o eliminar al primer usuario (super admin)
                if (usuario.id !== 1) {
                    const btnEliminar = document.createElement('button');
                    btnEliminar.textContent = 'Eliminar';
                    btnEliminar.classList.add('btn', 'btn_danger');
                    btnEliminar.addEventListener('click', () => handleDeleteUsuario(usuario.id, usuario.usuario, tr));
                    accionesCell.appendChild(btnEliminar);
                } else {
                    accionesCell.textContent = '---';
                }
                
                tr.appendChild(accionesCell);
                tbody.appendChild(tr);
            });

        } catch (error) {
            tbody.innerHTML = `<tr><td colspan="4" class="text-center py-4">Error: ${error.message}</td></tr>`;
        }
    };

    listarUsuarios();
}

export default usuariosController;