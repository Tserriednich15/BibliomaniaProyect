import protegerVista from './protegerVista.js';

protegerVista();

const contenedor = document.querySelector('.contenedor_libros');

const obtenerLibros = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/libros');
    const libros = await res.json();

    libros.forEach(libro => {
      const card = document.createElement('div');
      card.classList.add('card');

      const titulo = document.createElement('h3');
      titulo.textContent = libro.titulo;

      const autor = document.createElement('p');
      autor.textContent = `Autor: ${libro.autor}`;

      const genero = document.createElement('p');
      genero.textContent = `Género: ${libro.genero}`;

      const cantidad = document.createElement('p');
      cantidad.textContent = `Disponibles: ${libro.cantidad_disponible}`;

      card.append(titulo, autor, genero, cantidad);

      contenedor.append(card);
    });

  } catch (error) {
    console.error('Error al cargar libros:', error);
  }
};

obtenerLibros();