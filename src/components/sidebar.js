import { fetchData } from "../utils/fetchData.js";

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

  inicioLink.appendChild(inicioIcon);
  inicioLink.appendChild(inicioSpan);
  container.appendChild(inicioLink);

  // Creamos un contenedor para los items dinámicos y lo separamos con un margen superior
  const dynamicContainer = document.createElement('div');
  dynamicContainer.classList.add('sidebar-dynamic-items');
  dynamicContainer.style.marginTop = '20px'; // Esto baja un poco los items dinámicos para que "Inicio" se vea bien

  // Definimos el número máximo de items dinámicos (11 total: 1 de Inicio + 10 dinámicos)
  const maxSidebarItems = 10;

  // Se obtiene dinámicamente los géneros de manga de la API de Jikan.
  try {
    const url = "https://api.jikan.moe/v4/genres/manga";
    const res = await fetchData(url);
    if (res && res.data) {
      res.data.slice(0, maxSidebarItems).forEach(genre => {
        const a = document.createElement('a');
        // Construimos la URL para la categoría
        a.href = `categoria.html?genero=${encodeURIComponent(genre.name)}&tipo=manga`;
        a.classList.add('sidebar-item');

        // Usamos un icono genérico para representar el género
        const i = document.createElement('i');
        i.classList.add('ri-book-line');

        const span = document.createElement('span');
        span.textContent = genre.name;

        a.appendChild(i);
        a.appendChild(span);
        dynamicContainer.appendChild(a);
      });
    } else {
      console.warn("No se pudieron obtener los géneros de manga.");
    }
  } catch (error) {
    console.error("Error fetching manga genres for sidebar:", error);
  }

  // Se añade el contenedor dinámico al container principal
  container.appendChild(dynamicContainer);
  aside.appendChild(container);

  const app = document.getElementById('app');
  if (app) {
    app.appendChild(aside);
  } else {
    console.error("No se encontró el elemento con id 'app'");
  }
  return aside;
};
