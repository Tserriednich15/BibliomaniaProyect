import connection from '../utils/db.js';
import Prestamo from '../models/prestamo.js';
import Ejemplar from '../models/ejemplar.js';
import Devolucion from '../models/devolucion.js';
import Multa from '../models/multa.js';
import Visitante from "../models/visitante.js";

class PrestamoService {
  static async obtenerActivos() {
    try {
      const prestamos = await Prestamo.getAllActivos();
      return { success: true, data: prestamos, message: "Préstamos activos listados" };
    } catch (error) {
      console.error("Error en servicio al obtener préstamos:", error);
      return { success: false, message: "Error interno al obtener los préstamos.", code: 500 };
    }
  }
  static async crearPrestamo(data) {
    const { visitante, ejemplar_id } = data;

    if (!visitante || !visitante.cedula || !visitante.nombre || !visitante.apellido || !ejemplar_id) {
      return { success: false, code: 400, message: "Datos del visitante y el ejemplar son obligatorios." };
    }

    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      const ejemplar = await Ejemplar.getById(ejemplar_id, conn);
      if (!ejemplar || ejemplar.estado !== 'disponible') {
        await conn.rollback();
        return { success: false, code: 400, message: "El ejemplar seleccionado no está disponible." };
      }

      const visitante_id = await Visitante.findOrCreateByDetails(visitante, conn);
      
      const nuevoPrestamoId = await Prestamo.create({ ejemplar_id, visitante_id }, conn);
      await Ejemplar.actualizarEstado(ejemplar_id, 'prestado', conn);
      
      await conn.commit();

      return { success: true, data: { id: nuevoPrestamoId }, message: "Préstamo registrado exitosamente." };

    } catch (error) {
      await conn.rollback();
      console.error("Error al crear préstamo (transacción revertida):", error);
      return { success: false, code: 500, message: "Error interno al registrar el préstamo." };
    } finally {
      conn.release();
    }
  }
  static async procesarDevolucion(prestamoId) {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      const prestamo = await Prestamo.findById(prestamoId, conn);
      if (!prestamo) {
        return { success: false, code: 404, message: "El préstamo no existe." };
      }
      if (prestamo.estado === 'devuelto') {
        return { success: false, code: 400, message: "Este préstamo ya ha sido devuelto." };
      }

      await Prestamo.marcarComoDevuelto(prestamoId, conn);

      const hoy = new Date();
      const fechaDevolucion = hoy.toISOString().slice(0, 10);
      await Devolucion.create({ prestamo_id: prestamoId, fecha_devolucion: fechaDevolucion }, conn);

      await Ejemplar.actualizarEstado(prestamo.ejemplar_id, 'disponible', conn);

      const fechaVencimiento = new Date(prestamo.fecha_vencimiento);
      let mensajeMulta = "";

      if (hoy > fechaVencimiento) {
        const diasAtraso = Math.ceil((hoy - fechaVencimiento) / (1000 * 60 * 60 * 24));
        const montoMulta = diasAtraso * 1000;
        
        await Multa.create({
          visitante_id: prestamo.visitante_id,
          prestamo_id: prestamoId,
          monto: montoMulta,
          estado: 'pendiente'
        }, conn);
        mensajeMulta = ` Se ha generado una multa de ${montoMulta} por ${diasAtraso} día(s) de retraso.`;
      }
      
      await conn.commit();
      return { success: true, message: `Devolución registrada exitosamente.${mensajeMulta}`};

    } catch (error) {
      await conn.rollback();
      console.error("Error en la transacción de devolución:", error);
      return { success: false, code: 500, message: "Error interno al procesar la devolución." };
    } finally {
      conn.release();
    }
  }
}
export default PrestamoService;