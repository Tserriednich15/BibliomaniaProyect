async function loadView(app, templatePath) {
  try {
    const response = await fetch(templatePath);
    if (!response.ok) {
      throw new Error(`No se pudo cargar la vista: ${templatePath}.`);
    }
    const html = await response.text();
    app.innerHTML = '';
    app.innerHTML = html;
  } catch (error) {
    console.error("Error en loadView:", error);
    app.innerHTML = `<h2 style="color:red;">Error al cargar la vista.</h2>`;
  }
}

export default loadView;