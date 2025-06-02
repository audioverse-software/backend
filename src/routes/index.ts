import { Router } from "express";
import userRoutes from "@/routes/api/users";
import { InterestRoutes } from "./api/interest.api";

const router = Router();
const interestRoutes = new InterestRoutes();
interestRoutes.setRouter();

router.use("/users", userRoutes);
router.use("/interest", interestRoutes.getRouter());

export default router;
