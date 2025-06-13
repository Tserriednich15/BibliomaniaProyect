class ResponseProvider {
  /**
   * Devuelve una respuesta exitosa
   * @param {*} res - objeto de respuesta de Express
   * @param {*} data - datos a devolver
   * @param {string} message - mensaje opcional
   * @param {number} status - código de estado HTTP
   * @returns {Object}
   */
  static success(res, data = null, message = "Operación exitosa", status = 200) {
    return res.status(status).json({
      success: true,
      code: status,
      message,
      data,
      errors: []
    });
  }

  /**
   * Devuelve una respuesta de error
   * @param {*} res - objeto de respuesta de Express
   * @param {string} message - mensaje de error
   * @param {number} status - código de estado HTTP
   * @param {Array} errors - arreglo de errores adicionales
   * @returns {Object}
   */
  static error(res, message = "Error interno del servidor", status = 500, errors = []) {
    return res.status(status).json({
      success: false,
      code: status,
      message,
      data: null,
      errors
    });
  }
}

export default ResponseProvider;