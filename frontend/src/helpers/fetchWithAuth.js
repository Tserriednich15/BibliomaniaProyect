let accessToken = localStorage.getItem('accessToken');

async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Refresh token is invalid or expired");
    }

    accessToken = responseData.data.accessToken;
    localStorage.setItem('accessToken', accessToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    localStorage.clear();
    location.hash = '#login';
    throw new Error("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
  }
}

async function fetchWithAuth(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    try {
      const newAccessToken = await refreshToken();
      
      headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, { ...options, headers });

    } catch (error) {
      throw error;
    }
  }

  return response;
}

export function setAuthTokens(tokens) {
  accessToken = tokens.accessToken;
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
}

export function clearAuthTokens() {
  accessToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export default fetchWithAuth;