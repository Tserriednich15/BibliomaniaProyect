// src/components/sidebar.js

/**
 * Crea y gestiona el menú lateral (sidebar).
 * Se añade al body y se destruye a sí mismo al cerrarse.
 */
function crearSidebar() {
  // Si ya existe un sidebar en el DOM, no creamos otro para evitar duplicados.
  if (document.querySelector('.sidebar_menu')) {
    return;
  }
  
  // 1. Crear los elementos principales del DOM
  const sidebar = document.createElement("aside");
  sidebar.classList.add("sidebar_menu");

  const overlay = document.createElement("div");
  overlay.classList.add("sidebar_overlay");

  const content = document.createElement("div");
  content.classList.add("sidebar_content");
  
  // 2. Crear el header del sidebar
  const header = document.createElement("div");
  header.classList.add("sidebar_header");
  const title = document.createElement("h2");
  title.textContent = "Navegación";
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("sidebar_close_btn");
  const closeIcon = document.createElement("i");
  closeIcon.className = "ri-close-large-line";
  closeBtn.appendChild(closeIcon);
  header.append(title, closeBtn);

  // 3. Crear los enlaces de navegación
  const nav = document.createElement("nav");
  nav.classList.add("sidebar_nav");
  const navItems = [
    { text: 'Autores', href: '#autores', icon: 'ri-user-heart-line' },
    { text: 'Libros', href: '#libros', icon: 'ri-book-line' },
    { text: 'Categorías', href: '#categorias', icon: 'ri-bookmark-line' },
    { text: 'Editoriales', href: '#editoriales', icon: 'ri-building-line' },
    { text: 'Visitantes', href: '#visitantes', icon: 'ri-send-plane-2-line' },
    { text: 'Prestamos', href: '#prestamos', icon: 'ri-book-marked-line' },
    { text: 'Multas', href: '#multas', icon: 'ri-alarm-warning-line' },
    { text: 'Usuarios', href: '#usuarios', icon: 'ri-group-line' }
  ];
  navItems.forEach(item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.classList.add('sidebar_link');
    const icon = document.createElement('i');
    icon.className = item.icon;
    const span = document.createElement('span');
    span.textContent = item.text;
    link.append(icon, span);
    nav.appendChild(link);
  });

  // 4. Ensamblar todo el componente
  content.append(header, nav);
  sidebar.appendChild(content);

  // 5. Función para cerrar y eliminar el menú
  const closeMenu = () => {
    sidebar.classList.remove('is_open');
    overlay.classList.remove('is_open');
    // Esperamos a que la animación de salida termine para eliminar los elementos del DOM
    setTimeout(() => {
      if (sidebar.parentNode) sidebar.parentNode.removeChild(sidebar);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 300); // Este valor debe coincidir con la duración de la transición en el CSS
  };

  // 6. Añadir los eventos para cerrar el menú
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  nav.addEventListener('click', (e) => {
    // Si se hace clic en un enlace, también se cierra el menú
    if (e.target.closest('a')) {
      closeMenu();
    }
  });

  // 7. Añadir los elementos al DOM
  document.body.append(sidebar, overlay);

  // 8. Mostrar el menú
  // Usamos un pequeño timeout para asegurar que el navegador haya renderizado los elementos
  // antes de añadir la clase 'is_open', lo que dispara la transición del CSS.
  
  setTimeout(() => {
      sidebar.classList.add('is_open');
      overlay.classList.add('is_open');
    }, 10); // Un pequeño retardo es suficiente
    
    requestAnimationFrame(() => {
        sidebar.classList.add('is_open');
        overlay.classList.add('is_open');
      });
}

export default crearSidebar;