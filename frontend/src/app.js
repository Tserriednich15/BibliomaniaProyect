import 'sweetalert2/src/sweetalert2.scss'
import { router } from './routes/routes.js';
const app = document.querySelector("#app");
const header = document.querySelector("#header");
const div = document.createElement("div");
header.classList.add('container', 'header')
div.classList.add('menu')
div.append();
header.append(div);

window.addEventListener('hashchange', () => {
  router(app)
});
window.addEventListener('DOMContentLoaded', () => {
  router(app)
});