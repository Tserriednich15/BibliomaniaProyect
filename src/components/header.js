// export const crearHeader = () => {
//   const header = document.createElement("header");
//   header.classList.add("header");

//   const logoContainer = document.createElement("div");
//   logoContainer.classList.add("logo-container");

//   const logo = document.createElement("div");
//   logo.classList.add("logo");

//   const logoImgDiv = document.createElement("div");
//   logoImgDiv.classList.add("logo-img");

//   const img = document.createElement("img");
//   img.src = "https://png.pngtree.com/element_our/sm/20180410/sm_5acd1797b5783.jpg";
//   img.alt = "logo";

//   const tituloLogo = document.createElement("h1");
//   tituloLogo.id = "logo-txt";
//   tituloLogo.textContent = "Wiki";

//   const spanSheep = document.createElement("h1");
//   spanSheep.classList.add("txt_sheep");
//   spanSheep.textContent = "Sheep";

//   tituloLogo.appendChild(spanSheep);
//   logoImgDiv.appendChild(img);
//   logo.append(logoImgDiv, tituloLogo);
//   logoContainer.appendChild(logo);

//   // Search Form
//   const searchContainer = document.createElement("div");
//   searchContainer.classList.add("search-container");

//   const form = document.createElement("form");

//   const input = document.createElement("input");
//   input.type = "text";
//   input.placeholder = "Search";

//   const button = document.createElement("button");
//   button.classList.add("search");

//   const i = document.createElement("i");
//   i.className = "ri-search-line";

//   button.appendChild(i);
//   form.append(input, button);
//   searchContainer.appendChild(form);

//   // Profile
//   const profileContainer = document.createElement("div");
//   profileContainer.classList.add("profile-container");

//   const noti = document.createElement("a");
//   noti.href = "#";
//   noti.classList.add("noti");

//   const notiIcon = document.createElement("i");
//   notiIcon.className = "ri-notification-4-line";
//   const notificaciones = document.createElement("a");
//   notificaciones.classList.add("notificaciones");

//   noti.append(notiIcon, notificaciones);

//   const profileBox = document.createElement("div");
//   profileBox.classList.add("profile-box");

//   const profileImg = document.createElement("img");
//   profileImg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLTJJ4A_OsoOI0hScjyOmLOswDzS_1TgjLhAjFPU36zZNZdlw7WgYUnbNFbiWeNwhy3hs&usqp=CAU";

//   profileBox.appendChild(profileImg);

//   profileContainer.appendChild(noti, profileBox);

//   // Assemble header
//   header.append(logoContainer, searchContainer, profileContainer);

//   return header;
// };

// src/components/header.js
// src/components/header.js
// src/components/header.js
export function crearHeader() {
  // Crear el elemento header y asignarle la clase "header"
  const header = document.createElement("header");
  header.classList.add("header");

  // Contenedor interno para organizar los elementos
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header-container");

  // Logo: único título "WikiSheep"
  const logo = document.createElement("div");
  logo.classList.add("logo");
  logo.textContent = "WikiSheep";
  headerContainer.appendChild(logo);

  // Contenedor para la búsqueda
  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = "Buscar anime o manga...";
  searchContainer.appendChild(searchInput);
  headerContainer.appendChild(searchContainer);

  // Menú hamburguesa: se crea un contenedor y se le añade el icono de Remixicon
  const hamburger = document.createElement("div");
  hamburger.classList.add("hamburger-menu");
  const hamburgerIcon = document.createElement("i");
  hamburgerIcon.classList.add("ri-menu-line");  
  hamburger.appendChild(hamburgerIcon);
  headerContainer.appendChild(hamburger);

  header.appendChild(headerContainer);

  // Crear el overlay del menú móvil sin usar innerHTML
  const mobileMenu = document.createElement("div");
  mobileMenu.classList.add("mobile-menu");

  // Cabezera del menú móvil
  const mobileMenuHeader = document.createElement("div");
  mobileMenuHeader.classList.add("mobile-menu-header");

  // Botón de cierre del menú móvil
  const mobileMenuClose = document.createElement("span");
  mobileMenuClose.classList.add("mobile-menu-close");
  const closeIcon = document.createElement("i");
  closeIcon.classList.add("ri-close-line");
  mobileMenuClose.appendChild(closeIcon);
  mobileMenuHeader.appendChild(mobileMenuClose);

  // Título del menú móvil
  const mobileMenuTitle = document.createElement("h2");
  mobileMenuHeader.appendChild(mobileMenuTitle);

  mobileMenu.appendChild(mobileMenuHeader);

  // Navegación del menú móvil
  const mobileMenuNav = document.createElement("nav");
  mobileMenuNav.classList.add("mobile-menu-nav");
  const ul = document.createElement("ul");

  // Crear cada ítem del menú manualmente
  const menuItems = [
    { text: "Inicio", href: "index.html" },
    { text: "Categorías", href: "categoria.html?genero=shonen&tipo=anime" },
    { text: "Favoritos", href: "#" }
  ];

  menuItems.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.text;
    li.appendChild(a);
    ul.appendChild(li);
  });
  mobileMenuNav.appendChild(ul);
  mobileMenu.appendChild(mobileMenuNav);

  // Añadir el overlay del menú móvil al body para que cubra toda la pantalla
  document.body.appendChild(mobileMenu);

  // Funcionalidad: al hacer clic en el menú hamburguesa, alterna la visibilidad del overlay
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
  // Al hacer clic en el botón de cierre, se quita la clase que lo muestra
  mobileMenuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  return header;
}