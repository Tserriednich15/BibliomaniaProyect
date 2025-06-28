import Categoria from "../models/categoria.js";

class CategoriasService {
  static async getAll() {
    try {
      const categorias = await Categoria.getAll();
      return { success: true, data: categorias };
    } catch (error) {
      console.error("Error en el servicio al obtener categorías:", error);
      throw new Error("Error al obtener las categorías.");
    }
  }

  static async getById(id) {
    try {
      const categoria = await Categoria.getById(id);
      if (!categoria) {
        return { success: false, code: 404, message: "Categoría no encontrada." };
      }
      return { success: true, data: categoria };
    } catch (error) {
      console.error("Error en el servicio al obtener categoría por ID:", error);
      throw new Error("Error al obtener la categoría.");
    }
  }

  static async create({ nombre, descripcion }) {
    try {
      if (!nombre || nombre.trim() === '') {
        return { success: false, code: 400, message: "El nombre es un campo obligatorio." };
      }
      const nuevaCategoria = await Categoria.create({ nombre, descripcion });
      return { success: true, data: nuevaCategoria, message: "Categoría creada exitosamente." };
    } catch (error) {
      console.error("Error en el servicio al crear categoría:", error);
      throw new Error("Error al crear la categoría.");
    }
  }

  static async update(id, { nombre, descripcion }) {
    try {
      if (!nombre || nombre.trim() === '') {
        return { success: false, code: 400, message: "El nombre es un campo obligatorio." };
      }
      const affectedRows = await Categoria.update(id, { nombre, descripcion });
      if (affectedRows === 0) {
        return { success: false, code: 404, message: "Categoría no encontrada o sin cambios para actualizar." };
      }
      return { success: true, message: "Categoría actualizada exitosamente." };
    } catch (error) {
      console.error("Error en el servicio al actualizar categoría:", error);
      throw new Error("Error al actualizar la categoría.");
    }
  }

  static async delete(id) {
    try {
      const affectedRows = await Categoria.delete(id);
      if (affectedRows === 0) {
        return { success: false, code: 404, message: "Categoría no encontrada para eliminar." };
      }
      return { success: true, message: "Categoría eliminada exitosamente." };
    } catch (error) {
      console.error("Error en el servicio al eliminar categoría:", error);
      throw new Error("Error al eliminar la categoría.");
    }
  }
}

export default CategoriasService;