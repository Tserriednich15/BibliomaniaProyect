import Reserva from "../models/reserva.js";

class ReservaService {
  static async obtenerTodos() {
    return await Reserva.getAll();
  }

  static async obtenerPorId(id) {
    return await Reserva.getById(id);
  }

  static async crearReserva(data) {
    return await Reserva.create(data);
  }

  static async actualizarReserva(id, data) {
    return await Reserva.update(id, data);
  }

  static async eliminarReserva(id) {
    return await Reserva.delete(id);
  }
}

export default ReservaService;