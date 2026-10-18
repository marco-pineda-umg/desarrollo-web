import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("servidor iniciado en puerto:" + port);
    });
  })
  .catch(() => {
    console.error("Error al iniciar el servidor");
    process.exit(1);
  });
