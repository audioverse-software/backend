import { Router } from "express";
import { AuthController } from "../../controllers/auth/auth.controller";

const router = Router();
const authController = new AuthController();

// Register new user
router.post("/register", async (req, res) => {
  await authController.register(req, res);
});

// Login user
router.post("/login", async (req, res) => {
  await authController.login(req, res);
});

export default router;
