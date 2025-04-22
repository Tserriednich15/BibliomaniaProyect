// src/components/header.js

const crearHeader = () => {
    const header = document.createElement("header");
    header.classList.add("header");
  
    const logoContainer = document.createElement("div");
    logoContainer.classList.add("logo-container");
  
    const logo = document.createElement("div");
    logo.classList.add("logo");
  
    const logoImgDiv = document.createElement("div");
    logoImgDiv.classList.add("logo-img");
  
    const img = document.createElement("img");
    img.src = "https://png.pngtree.com/element_our/sm/20180410/sm_5acd1797b5783.jpg";
    img.alt = "logo";
  
    const tituloLogo = document.createElement("h1");
    tituloLogo.id = "logo-txt";
    tituloLogo.textContent = "Wiki";
  
    const spanSheep = document.createElement("h1");
    spanSheep.classList.add("txt_sheep");
    spanSheep.textContent = "Sheep";
  
    tituloLogo.appendChild(spanSheep);
    logoImgDiv.appendChild(img);
    logo.appendChild(logoImgDiv);
    logo.appendChild(tituloLogo);
    logoContainer.appendChild(logo);
  
    // Search Form
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");
  
    const form = document.createElement("form");
  
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search";
  
    const button = document.createElement("button");
    button.classList.add("search");
  
    const i = document.createElement("i");
    i.className = "ri-search-line";
  
    button.appendChild(i);
    form.appendChild(input);
    form.appendChild(button);
    searchContainer.appendChild(form);
  
    // Profile
    const profileContainer = document.createElement("div");
    profileContainer.classList.add("profile-container");
  
    const noti = document.createElement("a");
    noti.href = "#";
    noti.classList.add("noti");
  
    const notiIcon = document.createElement("i");
    notiIcon.className = "ri-notification-4-line";
    const notificaciones = document.createElement("a");
    notificaciones.classList.add("notificaciones");
  
    noti.appendChild(notiIcon);
    noti.appendChild(notificaciones);
  
    const profileBox = document.createElement("div");
    profileBox.classList.add("profile-box");
  
    const profileImg = document.createElement("img");
    profileImg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLTJJ4A_OsoOI0hScjyOmLOswDzS_1TgjLhAjFPU36zZNZdlw7WgYUnbNFbiWeNwhy3hs&usqp=CAU";
  
    profileBox.appendChild(profileImg);
  
    profileContainer.appendChild(noti);
    profileContainer.appendChild(profileBox);
  
    // Assemble header
    header.appendChild(logoContainer);
    header.appendChild(searchContainer);
    header.appendChild(profileContainer);
   
    return header;
  };
  
  export default crearHeader;