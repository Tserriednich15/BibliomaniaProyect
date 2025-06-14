
export const crearSidebar = () => {
  const aside = document.createElement('aside');
  aside.classList.add('sidebar');

  const container = document.createElement('div');
  container.classList.add('sidebar-items');

  const inicioLink = document.createElement('a');
  inicioLink.href = "index.html";
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