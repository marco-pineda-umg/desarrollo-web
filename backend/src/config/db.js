import mongoose from "mongoose";

export async function connectDB() {
  mongoose.connection.on("connected", () => {
    console.log("Conexion exitosa");
  });
  mongoose.connection.on("error", () => {
    console.error("Error de conexion");
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("Base de datos no esta conectada");
  });

  await mongoose.connect(process.env.MONGODB_URI);
}
