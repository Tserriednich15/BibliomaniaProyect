
export const crearFooter = () => {
    const footer = document.createElement("footer");
    footer.classList.add("footer");

    const footerContent = document.createElement("div");
    footerContent.classList.add("footer_content");

    // --- Sección 1: Sobre el Proyecto ---
    const section1 = document.createElement("div");
    section1.classList.add("footer_section");

    const h3_1 = document.createElement("h3");
    h3_1.textContent = "Bibliomania";
    const p1 = document.createElement("p");
    p1.textContent = "Tu fuente de conocimiento compartido.";

    section1.append(h3_1, p1);

    // --- Sección 2: Enlaces Rápidos ---
    const section2 = document.createElement("div");
    section2.classList.add("footer_section");

    const h3_2 = document.createElement("h3");
    h3_2.textContent = "Enlaces Rápidos";
    const ul1 = document.createElement("ul");

    // ✨ CAMBIO: Los enlaces ahora apuntan a rutas de la SPA
    const enlaces = [
        { texto: "Inicio", href: "#menu" },
        { texto: "Libros", href: "#libros" },
        { texto: "Autores", href: "#autores" }
    ];

    enlaces.forEach(enlace => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = enlace.href;
        a.textContent = enlace.texto;
        li.appendChild(a);
        ul1.appendChild(li);
    });

    section2.append(h3_2, ul1);

    // --- Sección 3: Redes Sociales ---
    const section3 = document.createElement("div");
    section3.classList.add("footer_section");

    const h3_3 = document.createElement("h3");
    h3_3.textContent = "Conecta con nosotros";
    const ul2 = document.createElement("ul");
    ul2.classList.add("social_icons");

    const redes = [
        { icono: "ri-facebook-circle-fill", url: "https://facebook.com", title: "Facebook" },
        { icono: "ri-twitter-fill", url: "https://twitter.com", title: "Twitter" },
        { icono: "ri-instagram-fill", url: "https://instagram.com", title: "Instagram" },
        { icono: "ri-github-fill", url: "https://github.com", title: "GitHub" }
    ];

    redes.forEach(red => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = red.url;
        a.target = "_blank"; // Abrir en nueva pestaña
        a.rel = "noopener noreferrer";
        a.title = red.title; // Buena práctica para accesibilidad
        const i = document.createElement("i");
        i.className = red.icono;
        a.appendChild(i);
        li.appendChild(a);
        ul2.appendChild(li);
    });

    section3.append(h3_3, ul2);

    footerContent.append(section1, section2, section3);

    // --- Sección Inferior: Copyright ---
    const footerBottom = document.createElement("div");
    footerBottom.classList.add("footer_bottom");

    const pBottom = document.createElement("p");
    // ✨ CAMBIO: El año se calcula dinámicamente
    pBottom.textContent = `© ${new Date().getFullYear()} Bibliomania. Todos los derechos reservados.`;

    footerBottom.appendChild(pBottom);
    footer.append(footerContent, footerBottom);

    return footer;
};