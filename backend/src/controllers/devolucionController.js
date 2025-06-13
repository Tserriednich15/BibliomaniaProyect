import DevolucionService from "../services/devolucionService.js";

class DevolucionController {
  static async obtenerTodos(req, res) {
    try {
      const devoluciones = await DevolucionService.obtenerTodos();
      res.json(devoluciones);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener devoluciones", error });
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const devolucion = await DevolucionService.obtenerPorId(id);
      if (!devolucion) {
        return res.status(404).json({ mensaje: "Devolución no encontrada" });
      }
      res.json(devolucion);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener la devolución", error });
    }
  }

  static async crear(req, res) {
    try {
      const nuevaDevolucion = await DevolucionService.crear(req.body);
      res.status(201).json(nuevaDevolucion);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al crear la devolución", error });
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const actualizada = await DevolucionService.actualizar(id, req.body);
      res.json(actualizada);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar la devolución", error });
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      await DevolucionService.eliminar(id);
      res.json({ mensaje: "Devolución eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar la devolución", error });
    }
  }
}

export default DevolucionController;
