export function obtenerUsuarios(req, res) {
  res.json({ mensaje: "Usuarios obtenidos con éxito", usuario: req.user });
}
