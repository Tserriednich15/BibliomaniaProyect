export function crearHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header-container");

  const logo = document.createElement("div");
  logo.classList.add("logo");
  logo.textContent = "Bibliomania";
  headerContainer.appendChild(logo);

  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = "Search...";
  searchContainer.appendChild(searchInput);
  headerContainer.appendChild(searchContainer);

  const hamburger = document.createElement("div");
  hamburger.classList.add("hamburger-menu");
  const hamburgerIcon = document.createElement("i");
  hamburgerIcon.classList.add("ri-menu-line");
  hamburger.appendChild(hamburgerIcon);
  headerContainer.appendChild(hamburger);

  header.appendChild(headerContainer);

  const mobileMenu = document.createElement("div");
  mobileMenu.classList.add("mobile-menu");

  const mobileMenuHeader = document.createElement("div");
  mobileMenuHeader.classList.add("mobile-menu-header");

  const mobileMenuClose = document.createElement("span");
  mobileMenuClose.classList.add("mobile-menu-close");
  const closeIcon = document.createElement("i");
  closeIcon.classList.add("ri-close-line");
  mobileMenuClose.appendChild(closeIcon);
  mobileMenuHeader.appendChild(mobileMenuClose);

  const mobileMenuTitle = document.createElement("h2");
  mobileMenuHeader.appendChild(mobileMenuTitle);

  mobileMenu.appendChild(mobileMenuHeader);

  const mobileMenuNav = document.createElement("nav");
  mobileMenuNav.classList.add("mobile-menu-nav");
  const ul = document.createElement("ul");

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

  document.body.appendChild(mobileMenu);

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
  mobileMenuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  return header;
}