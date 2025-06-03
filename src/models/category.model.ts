import mongoose, { Schema, Document } from "mongoose";
import { ICategory, CategoryStatus } from "@/interfaces/category.interface";
import { slugify } from "@/utils/slugify";

export interface CategoryDocument extends ICategory, Document {}

const CategorySchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    imageUrl: { type: String },
    status: {
      type: String,
      enum: Object.values(CategoryStatus),
      default: CategoryStatus.ACTIVE,
    },
  },
  { timestamps: true }
);

CategorySchema.pre<CategoryDocument>("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
