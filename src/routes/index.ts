import { Router } from "express";
import userRoutes from "@/routes/api/users";
import { InterestRoutes } from "./api/interest.api";

import categoryRoutes from "@routes/category/category.routes";


const router = Router();
const interestRoutes = new InterestRoutes();
interestRoutes.setRouter();

router.use("/api/users", userRoutes);
router.use("/api/categories", categoryRoutes);
router.use("/interest", interestRoutes.getRouter());

export default router;
