import EditorialService from "../services/editorialServices.js";
import ResponseProvider from "../providers/responseProvider.js";


class EditorialController {
  static async obtenerEditoriales(req, res) {
    try {
      const editoriales = await EditorialService.obtenerTodas();
      return ResponseProvider.success(res, editoriales);
    } catch (error) {
      console.error("Error al obtener editoriales:", error);
      return ResponseProvider.error(res, "Error al obtener las editoriales");
    }
  }

  static async obtenerEditorialPorId(req, res) {
    try {
      const { id } = req.params;
      const editorial = await EditorialService.obtenerPorId(id);

      if (!editorial) {
        return ResponseProvider.error(res, "Editorial no encontrada", 404);
      }

      return ResponseProvider.success(res, editorial);
    } catch (error) {
      console.error("Error al obtener la editorial:", error);
      return ResponseProvider.error(res, "Error al obtener la editorial");
    }
  }

  static async crearEditorial(req, res) {
    try {
      const { nombre, pais, fundacion, sitio_web, contacto_email } = req.body;

      if (!nombre) {
        return ResponseProvider.error(res, "El campo nombre es obligatorio", 400);
      }

      const nuevaId = await EditorialService.crearEditorial({
        nombre, pais, fundacion, sitio_web, contacto_email
      });

      return ResponseProvider.success(res, {
        id: nuevaId,
        message: "Editorial creada exitosamente"
      }, 201);
    } catch (error) {
      console.error("Error al crear editorial:", error);
      return ResponseProvider.error(res, "Error al crear la editorial");
    }
  }

  static async actualizarEditorial(req, res) {
    try {
      const { id } = req.params;
      const editorialExistente = await EditorialService.obtenerPorId(id);

      if (!editorialExistente) {
        return ResponseProvider.error(res, "Editorial no encontrada", 404);
      }

      const { nombre, pais, fundacion, sitio_web, contacto_email } = req.body;

      await EditorialService.actualizarEditorial(id, {
        nombre, pais, fundacion, sitio_web, contacto_email
      });

      return ResponseProvider.success(res, {
        message: "Editorial actualizada correctamente"
      });
    } catch (error) {
      console.error("Error al actualizar editorial:", error);
      return ResponseProvider.error(res, "Error al actualizar la editorial");
    }
  }

  static async eliminarEditorial(req, res) {
    try {
      const { id } = req.params;
      const editorialExistente = await EditorialService.obtenerPorId(id);

      if (!editorialExistente) {
        return ResponseProvider.error(res, "Editorial no encontrada", 404);
      }

      await EditorialService.eliminarEditorial(id);

      return ResponseProvider.success(res, {
        message: "Editorial eliminada correctamente"
      });
    } catch (error) {
      console.error("Error al eliminar editorial:", error);
      return ResponseProvider.error(res, "Error al eliminar la editorial");
    }
  }
}

export default EditorialController;
