import ReservaService from "../services/reservaService.js";

class ReservaController {
  static async obtenerTodos(req, res) {
    try {
      const reservas = await ReservaService.obtenerTodos();
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener las reservas", error: error.message });
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const reserva = await ReservaService.obtenerPorId(id);
      if (!reserva) {
        return res.status(404).json({ mensaje: "Reserva no encontrada" });
      }
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener la reserva", error: error.message });
    }
  }

  static async crear(req, res) {
    try {
      const nuevaReserva = await ReservaService.crearReserva(req.body);
      res.status(201).json(nuevaReserva);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al crear la reserva", error: error.message });
    }
  }

  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const reservaActualizada = await ReservaService.actualizarReserva(id, req.body);
      res.json(reservaActualizada);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al actualizar la reserva", error: error.message });
    }
  }

  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      await ReservaService.eliminarReserva(id);
      res.json({ mensaje: "Reserva eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al eliminar la reserva", error: error.message });
    }
  }
}

export default ReservaController;