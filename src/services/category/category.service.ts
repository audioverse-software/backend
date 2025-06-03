import { CategoryRepository } from "../../repositories/category/category.repository";
import { ICategory } from "@interfaces/category.interface";

export const CategoryService = {
  createCategory: (data: Partial<ICategory>) => CategoryRepository.create(data),
  getAllCategories: () => CategoryRepository.findAll(),
  getCategoryById: (id: string) => CategoryRepository.findById(id),
  updateCategory: (id: string, data: Partial<ICategory>) =>
    CategoryRepository.update(id, data),
  deleteCategory: (id: string) => CategoryRepository.delete(id),
};
