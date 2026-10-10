import mongoose from "mongoose";

const recursoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    info: { type: String, trim: true, default: "" },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    image: { type: String, trim: true, default: "/item1.webp" },
    section: { type: String, enum: ["ofertas", "nuevo"], default: "nuevo" },
  },
  { timestamps: true }
);

export default mongoose.model("Recurso", recursoSchema);
