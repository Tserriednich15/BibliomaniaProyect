export const crearSidebar = () => {
  const aside = document.createElement("aside");
  aside.classList.add("sidebar");

  const container = document.createElement("div");
  container.classList.add("sidebar-items");

  const menuItems = [
  { text: "Inicio", href: "#", icon: "ri-home-line" },
  { text: "Login", href: "#login", icon: "ri-login-circle-line" },
  { text: "Registro", href: "#registro", icon: "ri-user-add-line" },
  { text: "Libros", href: "#libros", icon: "ri-book-line" }
];


  menuItems.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.classList.add("sidebar-item");

    const icon = document.createElement("i");
    icon.className = item.icon;

    const span = document.createElement("span");
    span.textContent = item.text;

    link.append(icon, span);
    container.appendChild(link);
  });

  aside.appendChild(container);
  return aside;
};
