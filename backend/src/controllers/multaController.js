import MultaService from "../services/multaService.js";

class MultaController {


    static async getAllMultas(req, res) {
        try {
            const multas = await MultaService.obtenerTodos();
            res.json(multas);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener las multas", error });
        }
    };

    static async getMultaById(req, res) {
        try {
            const multa = await MultaService.obtenerPorId(req.params.id);
            if (!multa) {
                return res.status(404).json({ mensaje: "Multa no encontrada" });
            }
            res.json(multa);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener la multa", error });
        }
    };

    static async createMulta(req, res) {
        try {
            const nuevaMulta = await MultaService.crear(req.body);
            res.status(201).json(nuevaMulta);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al crear la multa", error });
        }
    };

    static async updateMulta(req, res) {
        try {
            const actualizada = await MultaService.actualizar(req.params.id, req.body);
            if (!actualizada) {
                return res.status(404).json({ mensaje: "Multa no encontrada" });
            }
            res.json({ mensaje: "Multa actualizada correctamente" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar la multa", error });
        }
    };

    static async deleteMulta(req, res) {
        try {
            const eliminada = await MultaService.eliminar(req.params.id);
            if (!eliminada) {
                return res.status(404).json({ mensaje: "Multa no encontrada" });
            }
            res.json({ mensaje: "Multa eliminada correctamente" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al eliminar la multa", error });
        }
    };
}

export default MultaController;