import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./src/routes/usuarioRoutes.js";
import categoriaRoutes from "./src/routes/categoriaRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import libroRoutes from "./src/routes/libroRoutes.js"
import autorRoutes from "./src/routes/autorRoutes.js"
import editorialRoutes from "./src/routes/editorialRoutes.js"
import visitanteRoutes from "./src/routes/visitanteRoutes.js"
import prestamoRoutes from "./src/routes/prestamoRoutes.js"
import reservaRoutes from "./src/routes/reservaRoutes.js"
import devolucionRoutes from "./src/routes/devolucionRoutes.js"
import multaRoutes from "./src/routes/multaRoutes.js"
import ejemplarRoutes from "./src/routes/ejemplarRoutes.js"
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import rolRoutes from './src/routes/rolRoutes.js';


dotenv.config();

// Crear la instancia de Express
const app = express();

// Habilita CORS
app.use(cors());

// Permite que la app acepte datos JSON (express.json()
app.use(express.json());

// Permite el envío de datos URL-encoded
app.use(express.urlencoded({ extended: true }));

// Permite manejar cookies en las respuestas.
app.use(cookieParser());

// Ruta base
app.get("/", (req, res) => {
  res.send("¡El backend funciona!");
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", router);
app.use("/api/admin", adminRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/editoriales", editorialRoutes);
app.use("/api/visitantes", visitanteRoutes);
app.use("/api/prestamos", prestamoRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/devoluciones", devolucionRoutes);
app.use("/api/multas", multaRoutes);
app.use("/api/ejemplares", ejemplarRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/roles', rolRoutes); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});