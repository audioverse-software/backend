import { Router } from "express";
import { CategoryController } from "@/controllers/category/category.controller"; 

const router = Router();

router.post("/", CategoryController.create);
router.get("/", CategoryController.findAll);
router.get("/:id", CategoryController.findOne);
router.patch("/:id", CategoryController.update);
router.delete("/:id", CategoryController.remove);

export default router;
