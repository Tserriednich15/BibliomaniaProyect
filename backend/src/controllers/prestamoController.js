import PrestamoService from "../services/prestamoService.js";

class PrestamoController {
  static async obtenerTodos(req, res) {
    try {
      const prestamos = await PrestamoService.obtenerTodos();
      res.json({
        success: true,
        message: "Préstamos obtenidos correctamente",
        data: prestamos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        code: 500,
        message: "Error al obtener los préstamos",
        data: null,
        errors: [],
      });
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const prestamo = await PrestamoService.obtenerPorId(id);
      if (!prestamo) {
        return res.status(404).json({
          success: false,
          code: 404,
          message: "Préstamo no encontrado",
          data: null,
          errors: [],
        });
      }

      res.json({
        success: true,
        message: "Préstamo obtenido correctamente",
        data: prestamo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        code: 500,
        message: "Error al obtener el préstamo",
        data: null,
        errors: [],
      });
    }
  }

  static async crearPrestamo(req, res) {
    try {
      const nuevoPrestamo = await PrestamoService.crearPrestamo(req.body);
      res.status(201).json({
        success: true,
        message: "Préstamo creado correctamente",
        data: { id: nuevoPrestamo },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        code: 500,
        message: "Error al crear el préstamo",
        data: null,
        errors: [],
      });
    }
  }

  static async actualizarPrestamo(req, res) {
    try {
      const { id } = req.params;
      await PrestamoService.actualizarPrestamo(id, req.body);
      res.json({
        success: true,
        message: "Préstamo actualizado correctamente",
        data: { id, ...req.body },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        code: 500,
        message: "Error al actualizar el préstamo",
        data: null,
        errors: [],
      });
    }
  }

  static async eliminarPrestamo(req, res) {
    try {
      const { id } = req.params;
      await PrestamoService.eliminarPrestamo(id);
      res.json({
        success: true,
        message: "Préstamo eliminado correctamente",
        data: { id },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        code: 500,
        message: "Error al eliminar el préstamo",
        data: null,
        errors: [],
      });
    }
  }
}

export default PrestamoController;