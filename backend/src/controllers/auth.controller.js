import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function userData(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function register(req, res) {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Faltan campos" });
  }
  if (String(password).length < 8) {
    return res.status(400).json({ message: "Contrasena muy corta" });
  }

  const exists = await User.findOne({
    email: String(email).trim().toLowerCase(),
  });
  if (exists) {
    return res.status(409).json({ message: "Ese correo ya registrado" });
  }

  const hash = await bcrypt.hash(String(password), 10);
  const user = await User.create({ name, email, password: hash });
  res.status(201).json({ user: userData(user) });
}

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Complete los campos" });
  }

  const user = await User.findOne({
    email: String(email).trim().toLowerCase(),
  }).select("+password");
  if (!user || !(await bcrypt.compare(String(password), user.password))) {
    return res.status(401).json({ message: "Credenciales invalidas" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.json({ token, user: userData(user) });
}

export function me(req, res) {
  res.json({ user: userData(req.user) });
}
