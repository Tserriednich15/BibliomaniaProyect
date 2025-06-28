import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { mostrarExito, mostrarError } from '../../helpers/notificaciones_helper.js';
import { validarFormularioAutor } from '../../helpers/validacion_helper.js';

function editarAutorController(params) {
  const autorId = params.id;
  if (!autorId) {
    location.hash = '#autores';
    return;
  }

  const form = document.querySelector("#autor_form");
  if (!form) return;

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!validarFormularioAutor(form)) {
      mostrarError('Formulario Incompleto', 'Por favor, corrige los errores señalados.');
      return;
    }
    
    const formData = new FormData(form);
    const autorData = Object.fromEntries(formData.entries());

    try {
      const request = await fetchWithAuth(`http://localhost:3000/api/autores/${autorId}`, {
        method: 'PUT',
        body: JSON.stringify(autorData)
      });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      
      await mostrarExito('¡Éxito!', 'Autor actualizado correctamente.');
      location.hash = '#autores';
    } catch (error) {
      mostrarError('Error al Actualizar', error.message);
    }
  };

  const loadAutorData = async () => {
    try {
      document.querySelector('#form_title').textContent = "Editando Autor...";
      const request = await fetchWithAuth(`http://localhost:3000/api/autores/${autorId}`);
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      const autor = responseData.data;
      if (!autor) throw new Error("No se recibieron datos del autor.");
      document.querySelector("#nombre").value = autor.nombre || '';
      document.querySelector("#nacionalidad").value = autor.nacionalidad || '';
      if (autor.fecha_nacimiento) {
        document.querySelector("#fecha_nacimiento").value = new Date(autor.fecha_nacimiento).toISOString().split('T')[0];
      }
      document.querySelector("#biografia").value = autor.biografia || '';
      document.querySelector("#sitio_web").value = autor.sitio_web || '';
      document.querySelector("#form_title").textContent = "Editar Autor";
      document.querySelector("#submit_btn").textContent = "Actualizar Autor";
    } catch (error) {
      mostrarError('Error al Cargar', error.message);
      location.hash = '#autores';
    }
  };

  form.addEventListener('submit', handleUpdate);
  loadAutorData(); 
}

export default editarAutorController;