const CACHE_EXPIRATION = 1000 * 60 * 5;

export function setCache(key, data) {
  const payload = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(payload));
}

export function getCache(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      return data;
    }
  } catch (error) {
    console.error("Error al parsear el cache", error);
  }
  return null;
}
