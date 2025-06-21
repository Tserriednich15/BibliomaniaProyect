// frontend/src/helpers/api.js

/**
 * URL base de la API del backend.
 * Asegúrate de que coincida con el puerto en el que corre tu servidor Express.
 */
const BASE_URL = 'http://localhost:3000/api';

/**
 * Función central para realizar todas las peticiones fetch a la API.
 * Maneja la autenticación, los encabezados y la conversión a JSON.
 * @param {string} endpoint - El endpoint de la API al que se llamará (ej. 'auth/login').
 * @param {string} [method='GET'] - El método HTTP de la petición.
 * @param {object|null} [body=null] - El cuerpo de la petición para POST o PUT.
 * @returns {Promise<any>} - La data de la respuesta exitosa.
 * @throws {Error} - Lanza un error si la petición falla.
 */
const apiFetch = async (endpoint, method = 'GET', body = null) => {
  const url = `${BASE_URL}/${endpoint}`;
  const token = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
  };

  // Si existe un token, lo añadimos al encabezado de autorización.
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  // Si hay un cuerpo en la petición, lo convertimos a JSON.
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Si la respuesta no fue exitosa (status no es 2xx), lanzamos un error.
    if (!response.ok) {
      // El backend debería enviar un objeto de error con una propiedad 'message'.
      throw new Error(data.message || 'Ocurrió un error en la petición.');
    }
    
    // Si la respuesta fue exitosa, devolvemos los datos.
    return data;

  } catch (error) {
    console.error(`Error en la petición a ${endpoint}:`, error);
    // Relanzamos el error para que pueda ser capturado por quien llamó a la función (ej. en el form de login).
    throw error;
  }
};

// Exportamos por defecto un objeto con métodos simplificados para cada tipo de petición.
// Esto hace que llamar a la API desde otros archivos sea mucho más limpio.
const api = {
  get: (endpoint) => apiFetch(endpoint),
  post: (endpoint, body) => apiFetch(endpoint, 'POST', body),
  put: (endpoint, body) => apiFetch(endpoint, 'PUT', body),
  del: (endpoint) => apiFetch(endpoint, 'DELETE'),
};

export default api;
