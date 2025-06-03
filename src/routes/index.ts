import { Router } from "express";
import userRoutes from "@/routes/api/users";

import categoryRoutes from "@routes/category/category.routes";


const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/categories", categoryRoutes);

export default router;
