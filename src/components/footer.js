export const crearFooter = () => {
  const footer = document.createElement("footer");
  footer.classList.add("footer");

  const footerContent = document.createElement("div");
  footerContent.classList.add("footer_content");

  const section1 = document.createElement("div");
  section1.classList.add("footer_section");

  const h3_1 = document.createElement("h3");
  h3_1.textContent = "WikiSheep";
  const p1 = document.createElement("p");
  p1.textContent = "Tu fuente de conocimiento compartido.";

  section1.appendChild(h3_1);
  section1.appendChild(p1);

  const section2 = document.createElement("div");
  section2.classList.add("footer_section");

  const h3_2 = document.createElement("h3");
  h3_2.textContent = "Enlaces Rápidos";
  const ul1 = document.createElement("ul");

  ["Inicio", "Categorías", "Sobre Nosotros"].forEach(texto => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = texto;
    li.appendChild(a);
    ul1.appendChild(li);
  });

  section2.appendChild(h3_2);
  section2.appendChild(ul1);

  const section3 = document.createElement("div");
  section3.classList.add("footer_section");

  const h3_3 = document.createElement("h3");
  h3_3.textContent = "Conecta con nosotros";
  const ul2 = document.createElement("ul");
  ul2.classList.add("social_icons");

  const redes = [
    { icono: "ri-facebook-circle-fill", url: "#" },
    { icono: "ri-twitter-fill", url: "#" },
    { icono: "ri-instagram-fill", url: "#" },
    { icono: "ri-github-fill", url: "#" }
  ];

  redes.forEach(red => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = red.url;
    const i = document.createElement("i");
    i.className = red.icono;
    a.appendChild(i);
    li.appendChild(a);
    ul2.appendChild(li);
  });

  section3.appendChild(h3_3);
  section3.appendChild(ul2);

  footerContent.appendChild(section1);
  footerContent.appendChild(section2);
  footerContent.appendChild(section3);

  const footerBottom = document.createElement("div");
  footerBottom.classList.add("footer_bottom");

  const pBottom = document.createElement("p");
  pBottom.textContent = "© 2024 WikiSheep. Todos los derechos reservados.";

  footerBottom.appendChild(pBottom);
  footer.appendChild(footerContent);
  footer.appendChild(footerBottom);

  return footer;
};