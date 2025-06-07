export const crearSidebar = () => {
  const aside = document.createElement('aside');
  const container = document.createElement('div');

  // Agregar las clases adecuadas
  aside.classList.add('sidebar');
  container.classList.add('sidebar-items');

  // Lista de ítems del sidebar
  const items = [
    { icon: 'ri-home-line', label: 'Home' },
    { icon: 'ri-question-line', label: 'Anime' },
    { icon: 'ri-question-line', label: 'Mangas' },
    { icon: 'ri-settings-3-line', label: 'Settings' }
  ];

  // Crear los ítems dinámicamente
  items.forEach(({ icon, label }) => {
    const a = document.createElement('a');
    a.href = '#';
    a.classList.add('sidebar-item');

    const i = document.createElement('i');
    i.classList.add(icon);

    const span = document.createElement('span');
    span.textContent = label;

    a.appendChild(i);
    a.appendChild(span);
    container.appendChild(a);
  });

  aside.appendChild(container);

  // Agregar el sidebar dentro de #app
  const app = document.getElementById('app');
  app.appendChild(aside);

  return aside;
};
