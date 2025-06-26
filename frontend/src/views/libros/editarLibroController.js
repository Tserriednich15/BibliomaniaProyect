import fetchWithAuth from '../../helpers/fetchWithAuth.js';

async function populateSelect(selectId, endpoint, selectedId) {
    // ... (es la misma función que en nuevoLibroController, puedes ponerla en un helper si quieres)
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
        select.innerHTML = `<option value="">Error</option>`;
    }
}

export async function editarLibroController(params) {
    const libroId = params.id;
    const form = document.querySelector("#libro_form");

    document.querySelector('#form_title').textContent = "Editar Libro";
    document.querySelector('#submit_btn').textContent = "Actualizar Libro";

    try {
        const request = await fetchWithAuth(`http://localhost:3000/api/libros/${libroId}`);
        const responseData = await request.json();
        if(!request.ok) throw new Error(responseData.message);
        
        const libro = responseData.data;
        
        // Llenar los campos de texto
        document.querySelector('#titulo').value = libro.titulo;
        document.querySelector('#anio_publicacion').value = libro.anio_publicacion;
        
        // Poblar los selects y seleccionar el valor correcto
        await Promise.all([
            populateSelect('categoria_id', 'categorias', libro.categoria_id),
            populateSelect('autor_id', 'autores', libro.autor_id),
            populateSelect('editorial_id', 'editoriales', libro.editorial_id)
        ]);

    } catch (error) {
        alert(error.message);
        location.hash = '#libros';
    }

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(form);
        const libroData = Object.fromEntries(formData.entries());

        try {
            const request = await fetchWithAuth(`http://localhost:3000/api/libros/${libroId}`, {
                method: 'PUT',
                body: JSON.stringify(libroData)
            });
            const responseData = await request.json();
            if(!request.ok) throw new Error(responseData.message);
            alert('Libro actualizado con éxito');
            location.hash = '#libros';
        } catch(error) {
            alert(error.message);
        }
    });
}