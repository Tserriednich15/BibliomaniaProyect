/**
 * Carga una plantilla HTML en un elemento del DOM.
 * @param {HTMLElement} app - El contenedor principal donde se inyectará la vista.
 * @param {string} templatePath - La ruta al archivo .html de la plantilla.
 */
async function loadView(app, templatePath) {
  try {
    const response = await fetch(templatePath);
    if (!response.ok) {
      throw new Error(`No se pudo cargar la vista: ${templatePath}.`);
    }
    const html = await response.text();
    // Limpiamos el contenedor antes de añadir la nueva vista
    app.innerHTML = '';
    app.innerHTML = html; // Usamos innerHTML aquí por simplicidad para cargar toda la vista
  } catch (error) {
    console.error("Error en loadView:", error);
    app.innerHTML = `<h2 style="color:red;">Error al cargar la vista.</h2>`;
  }
}

export default loadView;