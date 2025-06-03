import { Request, Response } from "express";
import { CategoryService } from "@services/category/category.service";

export const CategoryController = {
  create: async (req: Request, res: Response) => {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  findAll: async (_req: Request, res: Response) => {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  },

  findOne: async (req: Request, res: Response) => {
    const category = await CategoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ error: "Not found" });
    res.json(category);
  },

  update: async (req: Request, res: Response) => {
    try {
      const category = await CategoryService.updateCategory(
        req.params.id,
        req.body
      );
      if (!category) return res.status(404).json({ error: "Not found" });
      res.json(category);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  remove: async (req: Request, res: Response) => {
    const category = await CategoryService.deleteCategory(req.params.id);
    if (!category) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  },
};
