import { Router } from "express";
import userRoutes from "@/routes/api/users";
import { InterestRoutes } from "./api/interest.api";

import categoryRoutes from "@routes/category/category.routes";
import { NotificationApis } from "./api/notification.api";


const router = Router();
const interestRoutes = new InterestRoutes();
const notificationRoutes = new NotificationApis();
interestRoutes.setRouter();

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/interest", interestRoutes.getRouter());
router.use("/notification", notificationRoutes.getRouer());

export default router;
