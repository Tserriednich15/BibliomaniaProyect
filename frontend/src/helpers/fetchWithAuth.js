async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Por ahora, simplemente cerramos sesión. La lógica de refresh token se puede añadir aquí después.
    localStorage.clear();
    location.hash = '#login';
    throw new Error("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
  }

  return response;
}

export default fetchWithAuth;