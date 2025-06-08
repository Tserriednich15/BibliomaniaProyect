import { crearMain } from "../components/mainSection.js";

export function homeController() {
    const app = document.getElementById("app");

    while (app.firstChild) {
        app.removeChild(app.firstChild);
    }

    crearMain().then(content => {
        app.appendChild(content);
    });
}