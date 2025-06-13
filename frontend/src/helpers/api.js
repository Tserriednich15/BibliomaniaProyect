const apiUrl = "http://localhost:5173/api";

export async function obtenerCategorias() {
  try {
    const response = await fetch(`${apiUrl}/categorias`);
    const data = await response.json();
    return data.data; //devuelve los datos del array
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
}
