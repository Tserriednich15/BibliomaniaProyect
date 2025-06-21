// src/components/sidebar.js

// La función ahora acepta un parámetro que indica el estado de autenticación
export const crearSidebar = (isAuthenticated = false) => {
    const aside = document.createElement("aside");
    aside.classList.add("sidebar");

    const container = document.createElement("div");
    container.classList.add("sidebar-items");

    let menuItems = [];

    if (isAuthenticated) {
        // Items para un usuario logueado
        menuItems = [
            { text: "Menú", href: "#/menu", icon: "ri-home-line" },
            { text: "Libros", href: "#/libros", icon: "ri-book-line" },
            { text: "Autores", href: "#/autores", icon: "ri-user-heart-line" },
            { text: "Cerrar Sesión", href: "#/logout", icon: "ri-logout-circle-line" } // Un enlace para logout
        ];
    } else {
        // Items para un usuario no logueado (aunque este sidebar no se mostrará en login/registro)
        menuItems = [
            { text: "Login", href: "#/login", icon: "ri-login-circle-line" },
            { text: "Registro", href: "#/registro", icon: "ri-user-add-line" },
        ];
    }

    // El resto del código que crea los elementos <a> es el mismo...
    menuItems.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.href;
        // ...etcétera
        container.appendChild(link);
    });

    aside.appendChild(container);
    return aside;
};