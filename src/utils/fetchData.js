export async function fetchData(url, retries = 3, backoff = 3000, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    clearTimeout(id);
    if (retries > 0 && error.message.includes("429")) {
      console.warn(`Error 429 recibido. Reintentando en ${backoff} ms...`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchData(url, retries - 1, backoff * 2, timeout);
    }
    console.error("Error in fetchData:", error);
    throw error;
  }
}
