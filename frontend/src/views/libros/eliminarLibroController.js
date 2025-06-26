import fetchWithAuth     from '../../helpers/fetchWithAuth.js';
// import Swal from 'sweetalert2';

export async function eliminarLibro(libroId) {
  if (!confirm("¿Estás seguro de que deseas eliminar este libro?")) return;
  try {
    const request = await fetchWithAuth(`http://localhost:3000/api/libros/${libroId}`, { method: 'DELETE' });
    const responseData = await request.json();
    if (!request.ok) throw new Error(responseData.message);
    alert("Libro eliminado exitosamente.");
    document.querySelector(`#libro_row_${libroId}`).remove();
  } catch (error) {
    console.error("Error al eliminar libro:", error);
    alert(error.message);
  }
}