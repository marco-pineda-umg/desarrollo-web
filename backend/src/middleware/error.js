export function notFound(req, res) {
  res.status(404).json({ message: "No se encontro la ruta" });
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ message: "Datos invalidos" });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: "Ese correo ya registrado" });
  }
  console.error(err.message);
  res.status(500).json({ message: "Server error" });
}
