import Category from "@/models/category.model";
import { ICategory } from "@interfaces/category.interface";

export const CategoryRepository = {
  create: (data: Partial<ICategory>) => Category.create(data),
  findAll: () => Category.find(),
  findById: (id: string) => Category.findById(id),
  update: (id: string, data: Partial<ICategory>) =>
    Category.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  delete: (id: string) => Category.findByIdAndDelete(id),
};
