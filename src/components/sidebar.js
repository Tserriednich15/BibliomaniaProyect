const crearSidebar = () => {
    const aside = document.createElement('aside');
    aside.classList.add('sidebar');
  
    const container = document.createElement('div');
    container.classList.add('sidebar-items');
  
    const items = [
      { icon: 'ri-home-line', label: 'Home' },
      { icon: 'ri-question-line', label: 'Anime' },
      { icon: 'ri-question-line', label: 'Mangas' },
      { icon: 'ri-question-line', label: 'Series' },
      { icon: 'ri-question-line', label: 'Películas' },
      { icon: 'ri-question-line', label: '------' },
      { icon: 'ri-settings-3-line', label: 'Settings' }
    ];
  
    items.forEach(({ icon, label }) => {
      const a = document.createElement('a');
      a.href = '#';
      a.classList.add('sidebar-item');
  
      const i = document.createElement('i');
      i.id = 'item';
      i.classList.add(icon);
  
      const span = document.createElement('span');
      span.textContent = label;
  
      a.appendChild(i);
      a.appendChild(span);
      container.appendChild(a);
    });
    aside.appendChild(container);

    return aside;
  };
  
  export default crearSidebar;
  