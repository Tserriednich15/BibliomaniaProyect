// camposRegistro.js
import ResponseProvider from "../../providers/responseProvider.js";
import { campos } from "./campos.js";


export const camposRegistro = (req, res, next) => {
  const errors = [];

  for (const campo of campos) {
    const { name, required, minLength, maxLength, pattern } = campo;
    const value = req.body[name];

    if (required && (value === undefined || value === null || (typeof value === "string" && value.trim() === ""))) {
    errors.push({
    campo: name,
    message: `El campo ${name} es obligatorio y no puede estar vacío.`,
  });
  continue;
}
    
    if (minLength && value && value.length < minLength) {
      errors.push({
        campo: name,
        message: `El campo ${name} debe tener al menos ${minLength} caracteres.`,
      });
      continue;
    }
    
    if (maxLength && value && value.length > maxLength) {
      errors.push({
        campo: name,
        message: `El campo ${name} no puede tener más de ${maxLength} caracteres.`,
      });
      continue;
    }
    
    if (pattern && value && !pattern.test(value)) {
      errors.push({
        campo: name,
        message: `El campo ${name} debe cumplir los requisitos: mínimo 8 caracteres, 1 mayúscula y 1 número.`,
      });
      continue;
    }
  }

  if (errors.length > 0) {
  return ResponseProvider.error(res, "Error de validación", 400, errors);
  }
  next();
};
