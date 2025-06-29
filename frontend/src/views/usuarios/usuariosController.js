import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { eliminarUsuario } from './eliminarUsuarioController.js';

const API_URL = "http://localhost:3000/api";

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
                tr.id = `usuario_row_${usuario.id}`; 
                
                tr.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.rol}</td>
                `;

                const accionesCell = document.createElement('td');
                accionesCell.className = 'actions-cell';
                
                if (usuario.id !== 1) {
                    const btnEliminar = document.createElement('button');
                    btnEliminar.textContent = 'Eliminar';
                    btnEliminar.classList.add('btn', 'btn_danger');
                    btnEliminar.addEventListener('click', () => eliminarUsuario(usuario.id)); 
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