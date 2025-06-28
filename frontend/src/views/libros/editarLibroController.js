import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { mostrarExito, mostrarError } from '../../helpers/notificaciones_helper.js';
import { validarFormularioLibro } from '../../helpers/validacion_helper.js';

async function populateSelect(selectId, endpoint, selectedId) {
    const select = document.querySelector(`#${selectId}`);
    try {
        const request = await fetchWithAuth(`http://localhost:3000/api/${endpoint}`);
        const response = await request.json();
        if(!response.success) throw new Error(response.message);
        select.innerHTML = '<option value="">Seleccione una opción</option>';
        response.data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.nombre;
            if(item.id == selectedId) option.selected = true;
            select.appendChild(option);
        });
    } catch(error) {
        select.innerHTML = `<option value="">Error al cargar</option>`;
        console.error(`Error poblando ${selectId}:`, error);
    }
}

export async function editarLibroController(params) {
    const libroId = params.id;
    if (!libroId) {
        location.hash = '#libros';
        return;
    }

    const form = document.querySelector("#libro_form");
    if (!form) return;

    document.querySelector('#form_title').textContent = "Editar Libro";
    document.querySelector('#submit_btn').textContent = "Actualizar Libro";

    const loadBookData = async () => {
        try {
            const request = await fetchWithAuth(`http://localhost:3000/api/libros/${libroId}`);
            const responseData = await request.json();
            if(!request.ok) throw new Error(responseData.message);
            
            const libro = responseData.data;
            document.querySelector('#titulo').value = libro.titulo;
            document.querySelector('#anio_publicacion').value = libro.anio_publicacion;

            await Promise.all([
                populateSelect('categoria_id', 'categorias', libro.categoria_id),
                populateSelect('autor_id', 'autores', libro.autor_id),
                populateSelect('editorial_id', 'editoriales', libro.editorial_id)
            ]);
        } catch (error) {
            mostrarError('Error al Cargar', error.message);
            location.hash = '#libros';
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!validarFormularioLibro(form)) {
            mostrarError('Formulario Incompleto', 'Por favor, corrige los errores señalados.');
            return;
        }

        const formData = new FormData(form);
        const libroData = Object.fromEntries(formData.entries());

        try {
            const request = await fetchWithAuth(`http://localhost:3000/api/libros/${libroId}`, {
                method: 'PUT',
                body: JSON.stringify(libroData)
            });
            const responseData = await request.json();
            if(!request.ok) throw new Error(responseData.message);

            await mostrarExito('¡Éxito!', 'Libro actualizado correctamente.');
            location.hash = '#libros';
        } catch(error) {
            mostrarError('Error al Actualizar', error.message);
        }
    };

    form.addEventListener('submit', handleUpdate);
    loadBookData();
}