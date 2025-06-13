// src/controllers/autorController.js
import Autor from "../models/autor.js";
import ResponseProvider from "../providers/responseProvider.js";

class autorController {

    static async obtenerAutores  (req, res) {
        try {
            const autores = await Autor.findAll();
            return ResponseProvider.success(res, autores);
        } catch (error) {
            console.error("Error al obtener autores:", error);
            return ResponseProvider.error(res, "Error al obtener los autores");
        }
    };

    static async obtenerAutorPorId  (req, res) {
        try {
            const { id } = req.params;
            const autor = await Autor.getById(id);

            if (!autor) {
                return ResponseProvider.error(res, "Autor no encontrado", 404);
            }

            return ResponseProvider.success(res, autor);
        } catch (error) {
            console.error("Error al obtener el autor:", error);
            return ResponseProvider.error(res, "Error al obtener el autor");
        }
    };

    static async crearAutor  (req, res) {
        try {
            const { nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web } = req.body;

            if (!nombre) {
                return ResponseProvider.error(res, "El campo nombre es obligatorio", 400);
            }

            const nuevoAutorId = await Autor.create({ nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web });
            return ResponseProvider.success(res, { id: nuevoAutorId, message: "Autor creado exitosamente" }, 201);
        } catch (error) {
            console.error("Error al crear autor:", error);
            return ResponseProvider.error(res, "Error al crear el autor");
        }
    };

    static async actualizarAutor  (req, res) {
        try {
            const { id } = req.params;
            const autorExistente = await Autor.getById(id);

            if (!autorExistente) {
                return ResponseProvider.error(res, "Autor no encontrado", 404);
            }

            const { nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web } = req.body;
            await Autor.update(id, { nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web });

            return ResponseProvider.success(res, { message: "Autor actualizado correctamente" });
        } catch (error) {
            console.error("Error al actualizar autor:", error);
            return ResponseProvider.error(res, "Error al actualizar el autor");
        }
    };

    static async eliminarAutor  (req, res) {
        try {
            const { id } = req.params;
            const autorExistente = await Autor.getById(id);

            if (!autorExistente) {
                return ResponseProvider.error(res, "Autor no encontrado", 404);
            }

            await Autor.delete(id);
            return ResponseProvider.success(res, { message: "Autor eliminado correctamente" });
        } catch (error) {
            console.error("Error al eliminar autor:", error);
            return ResponseProvider.error(res, "Error al eliminar el autor");
        }
    };

}

export default autorController;