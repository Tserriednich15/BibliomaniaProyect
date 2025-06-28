function crearSidebar() {
  if (document.querySelector('.sidebar_menu')) {
    return;
  }
  
  const sidebar = document.createElement("aside");
  sidebar.classList.add("sidebar_menu");

  const overlay = document.createElement("div");
  overlay.classList.add("sidebar_overlay");

  const content = document.createElement("div");
  content.classList.add("sidebar_content");
  
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

  content.append(header, nav);
  sidebar.appendChild(content);

  const closeMenu = () => {
    sidebar.classList.remove('is_open');
    overlay.classList.remove('is_open');
    setTimeout(() => {
      if (sidebar.parentNode) sidebar.parentNode.removeChild(sidebar);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 300);
  };

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      closeMenu();
    }
  });

  document.body.append(sidebar, overlay);

  setTimeout(() => {
      sidebar.classList.add('is_open');
      overlay.classList.add('is_open');
    }, 10);
    
    requestAnimationFrame(() => {
        sidebar.classList.add('is_open');
        overlay.classList.add('is_open');
      });
}

export default crearSidebar;