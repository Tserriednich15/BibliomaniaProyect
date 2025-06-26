import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:3000/api';

export default async function nuevoPrestamoController() {
    const form = document.getElementById('prestamo-form');
    const libroSearchInput = document.getElementById('libro-search');
    const resultsContainer = document.getElementById('search-results-container');
    const selectedEjemplarIdInput = document.getElementById('selected-ejemplar-id');

    let debounceTimer;

    libroSearchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        resultsContainer.innerHTML = '';
        selectedEjemplarIdInput.value = '';

        clearTimeout(debounceTimer);

        if (query.length < 3) {
            resultsContainer.style.display = 'none';
            return;
        }

        resultsContainer.style.display = 'block';

        debounceTimer = setTimeout(async () => {
            try {
                const response = await fetchWithAuth(`${API_URL}/ejemplares/disponibles/buscar?q=${query}`);
                if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);

                const responseData = await response.json();
                const librosDisponibles = responseData.data;

                if (!Array.isArray(librosDisponibles)) {
                    throw new Error('El formato de la respuesta del servidor es incorrecto.');
                }

                if (librosDisponibles.length === 0) {
                    resultsContainer.innerHTML = '<div class="search-result-item">No se encontraron libros disponibles.</div>';
                    return;
                }

                librosDisponibles.forEach(ejemplar => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.textContent = `${ejemplar.libro.titulo} (Ejemplar #${ejemplar.id})`;
                    item.dataset.ejemplarId = ejemplar.id;
                    item.dataset.libroTitulo = ejemplar.libro.titulo;

                    item.addEventListener('click', () => {
                        libroSearchInput.value = item.dataset.libroTitulo;
                        selectedEjemplarIdInput.value = item.dataset.ejemplarId;
                        resultsContainer.style.display = 'none';
                    });

                    resultsContainer.appendChild(item);
                });

            } catch (error) {
                console.error('Error buscando libros:', error);
                resultsContainer.innerHTML = `<div class="search-result-item error">Error al buscar: ${error.message}</div>`;
            }
        }, 300);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const visitanteData = {
            cedula: document.getElementById('visitante-cedula').value.trim(),
            nombre: document.getElementById('visitante-nombre').value.trim(),
            apellido: document.getElementById('visitante-apellido').value.trim(),
            telefono: document.getElementById('visitante-telefono').value.trim() || null,
            correo: document.getElementById('visitante-correo').value.trim() || null,
        };

        const ejemplarId = selectedEjemplarIdInput.value;

        if (!visitanteData.cedula || !visitanteData.nombre || !visitanteData.apellido || !ejemplarId) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obligatorios',
                text: 'La cédula, nombre, apellido del visitante y la selección de un libro son obligatorios.'
            });
            return;
        }

        const payload = {
            visitante: visitanteData,
            ejemplar_id: parseInt(ejemplarId, 10)
        };

        try {
            const response = await fetchWithAuth(`${API_URL}/prestamos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error del servidor: ${response.status}`);
            }

            Swal.fire({
                icon: 'success',
                title: 'Préstamo Registrado',
                text: 'El préstamo se ha creado exitosamente.'
            }).then(() => {
                location.hash = '#prestamos';
            });

        } catch (error) {
            console.error('Error al registrar el préstamo:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de Registro',
                text: error.message || 'No se pudo registrar el préstamo.'
            });
        }
    });
}