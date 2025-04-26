import "reflect-metadata";
import "module-alias/register";
import app from "@/app";
import { initializeDatabase } from "@/config/database";
import { config } from "@/config/env";

const PORT = config.port;

// Add global error handler
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running in ${config.nodeEnv} mode on port ${PORT} \n Visit :: http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
