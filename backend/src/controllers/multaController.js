import MultaService from "../services/multaService.js";
import ResponseProvider from "../providers/responseProvider.js";
class MultaController {
    static async getAllMultas(req, res) {
        const result = await MultaService.obtenerTodas();
        if (!result.success) {
            return ResponseProvider.error(res, result.message, result.code);
        }
        return ResponseProvider.success(res, result.data, "Multas listadas correctamente");
    }
    static async pagarMulta(req, res) {
        const { id } = req.params;
        const result = await MultaService.pagarMulta(id);

        if (!result.success) {
            return ResponseProvider.error(res, result.message, result.code);
        }
        return ResponseProvider.success(res, null, result.message);
    }
}
export default MultaController;