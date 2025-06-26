// src/controllers/categoriasController.js
import CategoriasService from "../services/categoriaService.js";
import ResponseProvider from "../providers/responseProvider.js";

class CategoriasController {
  static async getAllCategorias(req, res) {
    try {
      const result = await CategoriasService.getAll();
      return ResponseProvider.success(res, result.data, "Categorías listadas correctamente");
    } catch (error) {
      return ResponseProvider.error(res, error.message, 500);
    }
  }

  static async getCategoriaById(req, res) {
    try {
      const { id } = req.params;
      const result = await CategoriasService.getById(id);
      if (!result.success) {
        return ResponseProvider.error(res, result.message, result.code);
      }
      return ResponseProvider.success(res, result.data, "Categoría encontrada");
    } catch (error) {
      return ResponseProvider.error(res, error.message, 500);
    }
  }

  static async createCategoria(req, res) {
    try {
      const result = await CategoriasService.create(req.body);
      if (!result.success) {
        return ResponseProvider.error(res, result.message, result.code);
      }
      return ResponseProvider.success(res, result.data, result.message, 201);
    } catch (error) {
      return ResponseProvider.error(res, error.message, 500);
    }
  }

  static async updateCategoria(req, res) {
    try {
      const { id } = req.params;
      const result = await CategoriasService.update(id, req.body);
      if (!result.success) {
        return ResponseProvider.error(res, result.message, result.code);
      }
      return ResponseProvider.success(res, null, result.message);
    } catch (error) {
      return ResponseProvider.error(res, error.message, 500);
    }
  }

  static async deleteCategoria(req, res) {
    try {
      const { id } = req.params;
      const result = await CategoriasService.delete(id);
      if (!result.success) {
        return ResponseProvider.error(res, result.message, result.code);
      }
      return ResponseProvider.success(res, null, result.message);
    } catch (error) {
      return ResponseProvider.error(res, error.message, 500);
    }
  }
  static async buscarEjemplaresDisponibles(req, res) {
    try {
      // El término de búsqueda viene como un query param (ej: /buscar?q=rebelion)
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

export default CategoriasController;