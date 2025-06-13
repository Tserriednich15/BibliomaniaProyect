import EjemplarService from "../services/ejemplarService.js";

class EjemplarController {

    static async getAllEjemplares(req, res) {
        try {
            const ejemplares = await EjemplarService.obtenerTodos();
            res.json(ejemplares);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener los ejemplares", error });
        }
    };

    static async getEjemplarById(req, res) {
        try {
            const { id } = req.params;
            const ejemplar = await EjemplarService.obtenerPorId(id);
            if (!ejemplar) {
                return res.status(404).json({ mensaje: "Ejemplar no encontrado" });
            }
            res.json(ejemplar);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener el ejemplar", error });
        }
    };

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
}

export default EjemplarController;