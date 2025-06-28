import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { mostrarExito, mostrarError } from '../../helpers/notificaciones_helper.js';
import { validarFormularioLibro } from '../../helpers/validacion_helper.js';

async function populateSelect(selectId, endpoint) {
    const select = document.querySelector(`#${selectId}`);
    try {
        const request = await fetchWithAuth(`http://localhost:3000/api/${endpoint}`);
        const response = await request.json();
        if(!response.success) throw new Error(response.message);
        select.innerHTML = '<option value="">Seleccione una opción</option>';
        response.data.forEach(item => {
            select.innerHTML += `<option value="${item.id}">${item.nombre}</option>`;
        });
    } catch(error) {
        select.innerHTML = `<option value="">Error al cargar</option>`;
        console.error(`Error poblando ${selectId}:`, error);
    }
}

export function nuevoLibroController() {
    document.querySelector('#form_title').textContent = "Nuevo Libro";
    document.querySelector('#submit_btn').textContent = "Guardar Libro";

    populateSelect('categoria_id', 'categorias');
    populateSelect('autor_id', 'autores');
    populateSelect('editorial_id', 'editoriales');

    const form = document.querySelector("#libro_form");
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();

        if (!validarFormularioLibro(form)) {
            mostrarError('Formulario Incompleto', 'Por favor, corrige los errores señalados.');
            return;
        }

        const formData = new FormData(form);
        const libroData = Object.fromEntries(formData.entries());

        try {
            const request = await fetchWithAuth("http://localhost:3000/api/libros", {
                method: 'POST',
                body: JSON.stringify(libroData)
            });
            const responseData = await request.json();
            if(!request.ok) throw new Error(responseData.message);

            await mostrarExito('¡Éxito!', 'Libro creado correctamente.');
            location.hash = '#libros';
        } catch(error) {
            mostrarError('Error al Crear', error.message);
        }
    });
}