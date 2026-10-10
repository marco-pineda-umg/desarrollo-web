import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  const header = req.get("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    return res.status(401).json({ message: "No se ha iniciado sesion" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id);
  } catch {
    return res
      .status(401)
      .json({ message: "La sesion no es valida o se vencio" });
  }

  if (!req.user) {
    return res.status(401).json({ message: "Ese usuario no existe" });
  }
  next();
}
