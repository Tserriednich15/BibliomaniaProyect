class ResponseProvider {
  static success(res, data = null, message = "Operación exitosa", status = 200) {
    return res.status(status).json({
      success: true,
      code: status,
      message,
      data,
      errors: []
    });
  }
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