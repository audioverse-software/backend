import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "@/routes/index";
import { config } from "@/config/env";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Welcome
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "Welcome to AudioVerse Backend" });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", environment: config.nodeEnv });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error Handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
);

export default app;
