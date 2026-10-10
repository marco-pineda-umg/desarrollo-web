import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import recursosRoutes from "./routes/recursos.routes.js";
import { notFound, errorHandler } from "./middleware/error.js";

const app = express();
const origins = (process.env.CLIENT_ORIGINS || "").split(",").map((origin) => origin.trim());

app.use(cors({ origin: origins }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/recursos", recursosRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
