import Recurso from "../models/Recurso.js";

function recursoData(body = {}) {
  const { title, description, info, price, stock, category, image, section } =
    body;
  return { title, description, info, price, stock, category, image, section };
}

export async function list(req, res) {
  const { q, category, section } = req.query;
  const filter = {};
  if (q) {
    const text = String(q)
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.title = { $regex: text, $options: "i" };
  }
  if (category) filter.category = String(category);
  if (section) filter.section = String(section);

  const recursos = await Recurso.find(filter).sort({ createdAt: -1 });
  res.json({ recursos });
}

export async function detail(req, res) {
  const recurso = await Recurso.findById(req.params.id);
  if (!recurso) {
    return res.status(404).json({ message: "No se encontro el producto" });
  }
  res.json({ recurso });
}

export async function create(req, res) {
  const recurso = await Recurso.create(recursoData(req.body));
  res.status(201).json({ recurso });
}

export async function update(req, res) {
  const recurso = await Recurso.findByIdAndUpdate(
    req.params.id,
    recursoData(req.body),
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  if (!recurso) {
    return res.status(404).json({ message: "No se encontro el producto" });
  }
  res.json({ recurso });
}

export async function remove(req, res) {
  const recurso = await Recurso.findByIdAndDelete(req.params.id);
  if (!recurso) {
    return res.status(404).json({ message: "No se encontro el producto" });
  }
  res.json({ recurso });
}
