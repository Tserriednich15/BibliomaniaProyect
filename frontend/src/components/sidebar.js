
export const crearSidebar = async () => {
  const aside = document.createElement('aside');
  aside.classList.add('sidebar');

  const container = document.createElement('div');
  container.classList.add('sidebar-items');

  // Creamos el item de "Inicio" (Home)
  const inicioLink = document.createElement('a');
  inicioLink.href = "index.html"; // Cambia este URL si es necesario
  inicioLink.classList.add('sidebar-item');

  const inicioIcon = document.createElement('i');
  inicioIcon.classList.add('ri-home-line');

  const inicioSpan = document.createElement('span');
  inicioSpan.textContent = 'Inicio';

  inicioLink.append(inicioIcon, inicioSpan);
  container.appendChild(inicioLink);
  aside.appendChild(container);

  return aside;
};