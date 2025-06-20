// frontend/helpers/api.js

const BASE_URL = 'http://localhost:3000/api'; // O el puerto que use tu backend

const apiFetch = async (endpoint, method = 'GET', body = null) => {
  const url = `${BASE_URL}/${endpoint}`;
  const token = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      // Si el backend devuelve un error, lo lanzamos para que sea capturado por el .catch()
      throw data; 
    }
    
    return data; // Esto sería { success: true, data: ..., message: ... }

  } catch (error) {
    console.error(`Error en la petición a ${endpoint}:`, error);
    // Retornamos el error para manejarlo en la lógica del componente (ej: mostrar SweetAlert)
    return Promise.reject(error); 
  }
};

// Exportamos métodos simplificados para no tener que escribir 'POST', 'GET', etc. cada vez
export const api = {
  get: (endpoint) => apiFetch(endpoint),
  post: (endpoint, body) => apiFetch(endpoint, 'POST', body),
  put: (endpoint, body) => apiFetch(endpoint, 'PUT', body),
  del: (endpoint) => apiFetch(endpoint, 'DELETE'),
};