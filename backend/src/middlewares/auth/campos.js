export const campos = [
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
    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
  },
  {
    name: "rol_id",
    required: true
  }
];
