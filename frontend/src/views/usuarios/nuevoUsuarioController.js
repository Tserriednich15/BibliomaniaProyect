// frontend/src/controllers/usuarios/nuevoUsuarioController.js

import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';
import usuariosController from './usuariosController.js';

const API_URL = "http://localhost:3000/api";

async function populateRolesDropdown() {
  const selectRol = document.getElementById('rol');
  try {
    const response = await fetchWithAuth(`${API_URL}/roles`);
    const responseData = await response.json();

    if (!responseData.success) throw new Error(responseData.message);
    
    selectRol.innerHTML = '<option value="">Seleccione un rol...</option>'; 

    responseData.data.forEach(rol => {

        if (rol.nombre.toLowerCase() !== 'administrador') {
        const option = document.createElement('option');
        option.value = rol.id;
        option.textContent = rol.nombre;
        selectRol.appendChild(option);
      }
    });

  } catch (error) {
    console.error("Error al cargar roles:", error);
    selectRol.innerHTML = '<option value="">Error al cargar roles</option>';
  }
}

function nuevoUsuarioController() {
  const form = document.getElementById('generic-form');
  if (!form) return;

  populateRolesDropdown();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();
    const rol_id = document.getElementById('rol').value;

    if (!usuario || !contrasena || !rol_id) {
      Swal.fire('Campos incompletos', 'Por favor, rellene todos los campos.', 'warning');
      return;
    }
    if (contrasena.length < 8) {
      Swal.fire('Contraseña insegura', 'La contraseña debe tener al menos 8 caracteres.', 'warning');
      return;
    }

    const payload = { usuario, contrasena, rol_id };

    try {
      const response = await fetchWithAuth(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message);
      
      await Swal.fire('¡Usuario Creado!', 'El nuevo usuario ha sido registrado exitosamente.', 'success');
      
      location.hash = '#usuarios';

    } catch (error) {
      Swal.fire('Error', `No se pudo crear el usuario: ${error.message}`, 'error');
    }
  });
}

export default nuevoUsuarioController;