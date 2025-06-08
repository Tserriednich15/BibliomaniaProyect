import { crearMain } from "../components/mainSection.js";

export function homeController() {
  const app = document.getElementById("app");

<<<<<<< HEAD
    while (app.firstChild) {
        app.removeChild(app.firstChild);
    }
=======
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
>>>>>>> 264bbdace8f3a4a59c66e7f4e62da273ced73362

  crearMain().then(content => {
    app.appendChild(content);
  });
}