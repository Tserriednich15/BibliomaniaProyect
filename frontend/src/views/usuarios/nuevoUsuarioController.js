import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { mostrarExito, mostrarError } from '../../helpers/notificaciones_helper.js';
import { validarFormularioUsuario } from '../../helpers/validacion_helper.js';

const API_URL = "http://localhost:3000/api";

async function populateRolesDropdown() {
  const selectRol = document.getElementById('rol');
  try {
    const response = await fetchWithAuth(`${API_URL}/roles`);
    const responseData = await response.json();

    if (!responseData.success) throw new Error(responseData.message);
    
    selectRol.innerHTML = '<option value="">Seleccione un rol...</option>';
    responseData.data.forEach(rol => {
        // Asumiendo que no quieres que se puedan crear Administradores desde aquí
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

  // Poblar el dropdown de roles al cargar la vista
  populateRolesDropdown();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Usamos nuestro nuevo validador específico para usuarios
    if (!validarFormularioUsuario(form)) {
        mostrarError('Formulario Incompleto', 'Por favor, corrige los errores señalados.');
        return;
    }

    const payload = {
        usuario: document.getElementById('usuario').value.trim(),
        contrasena: document.getElementById('contrasena').value.trim(),
        rol_id: document.getElementById('rol').value
    };

    try {
      const response = await fetchWithAuth(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message);
      
      await mostrarExito('¡Usuario Creado!', 'El nuevo usuario ha sido registrado exitosamente.');
      
      // Limpiar formulario y redirigir
      form.reset();
      location.hash = '#usuarios';

    } catch (error) {
      mostrarError('Error', `No se pudo crear el usuario: ${error.message}`);
    }
  });
}

export default nuevoUsuarioController;