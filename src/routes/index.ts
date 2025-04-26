import { Router } from "express";
import userRoutes from "@/routes/api/users";

const router = Router();

router.use("/api/users", userRoutes);

export default router;
