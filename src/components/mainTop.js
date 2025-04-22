const crearMainTop = () => {
    const div = document.createElement('div');
    div.classList.add('main_top');
  
    const h1 = document.createElement('h1');
    h1.textContent = 'Bienvenido a WikiSheep';
  
    const p = document.createElement('p');
    p.textContent = 'Tu enciclopedia interactiva de anime, mangas y más.';
  
    div.appendChild(h1);
    div.appendChild(p);
  
    return div;
  };
  
  export default crearMainTop;
  