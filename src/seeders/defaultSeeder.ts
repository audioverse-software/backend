// Seeder for default Interests (TypeORM) and Categories (Mongoose)
import { AppDataSource, initializeDatabase } from "@/config/database";
import { Interest } from "@/entities/Interest";
import mongoose from "mongoose";
import Category from "@/models/category.model";
import { CategoryStatus } from "@/interfaces/category.interface";

const defaultInterests = [
  "reading",
  "movie",
  "music",
  "hiking",
  "comic",
  "anime",
];

const defaultCategories = [
  "general",
  "alternative",
  "hiphop",
  "afrobeats",
];

async function seed() {
  try {
    // --- Seed Interests (TypeORM) ---
    await initializeDatabase();
    const interestRepo = AppDataSource.getRepository(Interest);
    for (const name of defaultInterests) {
      // Use image_url as the name, status as 'active'
      const exists = await interestRepo.findOneBy({ image_url: name });
      if (!exists) {
        const interest = interestRepo.create({ image_url: name, status: "active" });
        await interestRepo.save(interest);
        console.log(`Inserted interest: ${name}`);
      }
    }

    // --- Seed Categories (Mongoose) ---
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/audioverse");
    }
    for (const title of defaultCategories) {
      const exists = await Category.findOne({ title });
      if (!exists) {
        const category = new Category({
          title,
          slug: title.toLowerCase().replace(/\s+/g, "-"),
          status: CategoryStatus.ACTIVE,
        });
        await category.save();
        console.log(`Inserted category: ${title}`);
      }
    }
    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
