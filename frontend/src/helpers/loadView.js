// helpers/loadView.js
export async function loadView(viewPath, containerElementOrSelector = 'main') {
  try {
    const response = await fetch(viewPath);
    const html = await response.text();

    const container = typeof containerElementOrSelector === 'string'
      ? document.querySelector(containerElementOrSelector)
      : containerElementOrSelector;

    if (container) {
      container.innerHTML = html;
    } else {
      console.error('Contenedor no encontrado para cargar la vista:', viewPath);
    }
  } catch (error) {
    console.error('Error al cargar la vista:', error);
  }
}
