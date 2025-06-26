import EjemplarService from "../services/ejemplarService.js";
import ResponseProvider from "../providers/responseProvider.js";

class EjemplarController {
    static async getAllEjemplares(req, res) {
        try {
            const result = await EjemplarService.obtenerTodos();
            return ResponseProvider.success(res, result.data, "Ejemplares listados");
        } catch (error) {
            return ResponseProvider.error(res, error.message);
        }
    }

    static async getEjemplaresDisponibles(req, res) {
        try {
            const result = await EjemplarService.obtenerDisponibles();
            return ResponseProvider.success(res, result.data, "Ejemplares disponibles listados");
        } catch (error) {
            return ResponseProvider.error(res, error.message);
        }
    }

    static async getEjemplarById(req, res) {
        try {
            const result = await EjemplarService.obtenerPorId(req.params.id);
            if (!result.success) {
                return ResponseProvider.error(res, result.message, result.code);
            }
            return ResponseProvider.success(res, result.data);
        } catch (error) {
            return ResponseProvider.error(res, error.message);
        }
    }

    static async createEjemplar(req, res) {
        try {
            const nuevoEjemplar = await EjemplarService.crear(req.body);
            res.status(201).json(nuevoEjemplar);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al crear el ejemplar", error });
        }
    };

    static async updateEjemplar(req, res) {
        try {
            const { id } = req.params;
            const ejemplarActualizado = await EjemplarService.actualizar(id, req.body);
            res.json(ejemplarActualizado);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar el ejemplar", error });
        }
    };

    static async deleteEjemplar(req, res) {
        try {
            const { id } = req.params;
            await EjemplarService.eliminar(id);
            res.json({ mensaje: "Ejemplar eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al eliminar el ejemplar", error });
        }
    };
    static async buscarEjemplaresDisponibles(req, res) {
        try {
            const query = req.query.q;
            if (!query) {
                return ResponseProvider.error(res, "El término de búsqueda es requerido.", 400);
            }

            const result = await EjemplarService.buscarDisponibles(query);
            return ResponseProvider.success(res, result.data, "Búsqueda de ejemplares completada");
        } catch (error) {
            return ResponseProvider.error(res, error.message);
        }
    }
}

export default EjemplarController;