export async function fetchData(url, retries = 3, backoff = 3000) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    // Si el error es 429 y aún tenemos reintentos disponibles, esperar y reintentar
    if (retries > 0 && error.message.includes("429")) {
      console.warn(`Error 429 recibido. Reintentando en ${backoff} ms...`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchData(url, retries - 1, backoff * 2);
    }
    console.error("Error in fetchData:", error);
    throw error;
  }
}
