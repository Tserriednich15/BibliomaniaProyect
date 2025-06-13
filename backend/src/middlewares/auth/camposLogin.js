// camposLogin.js
import ResponseProvider from "../../providers/responseProvider.js";

// Definición de campos para login: usamos "usuario" y "contrasena"
const campos = [
  {
    name: "usuario",
    required: true,
    minLength: 4,
    maxLength: 40,
  },
  {
    name: "contrasena",
    required: true,
    minLength: 8,
    maxLength: 40,
  },
];

export const camposLogin = (req, res, next) => { 
  const errors = [];

  for (const campo of campos) {
    const { name, required, pattern } = campo;
    const value = req.body[name];

    if (required && (!value || value.trim() === "")) {
      errors.push({
        campo: name,
        message: `El campo ${name} es obligatorio y no puede estar vacío.`,
      });
      continue;
    }

    if (pattern && value && !pattern.test(value)) {
      errors.push({
        campo: name,
        message: `El campo ${name} debe cumplir los requisitos: mínimo 8 caracteres, 1 mayúscula y 1 número.`,
      });
    }
  }

  if (errors.length > 0) {
    return ResponseProvider.error(res, "Error en los campos", 400, errors);
  }
  
  next();
};
