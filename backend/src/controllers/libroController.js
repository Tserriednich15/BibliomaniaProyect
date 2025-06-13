import LibroService from "../services/libroService.js";

class libroController {

  static listarLibros = async (req, res) => {
    const result = await LibroService.listarLibros();
    if (result.error) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(result.code).json(result.data);
  };

  static obtenerLibroPorId = async (req, res) => {
    const { id } = req.params;
    const result = await LibroService.obtenerLibroPorId(id);
    return res.status(result.code).json(result.data || { message: result.message });
  };

  static crearLibro = async (req, res) => {
    const datosLibro = req.body;
    const result = await LibroService.crearLibro(datosLibro);
    return res.status(result.code).json(result.data || { message: result.message });
  };

  static actualizarLibro = async (req, res) => {
    const { id } = req.params;
    const datosLibro = req.body;
    const result = await LibroService.actualizarLibro(id, datosLibro);
    return res.status(result.code).json({ message: result.message });
  };

  static eliminarLibro = async (req, res) => {
    const { id } = req.params;
    const result = await LibroService.eliminarLibro(id);
    return res.status(result.code).json({ message: result.message });
  };
}

export default libroController;