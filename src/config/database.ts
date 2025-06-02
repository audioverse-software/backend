import { DataSource, DataSourceOptions, In } from "typeorm";
import { config } from "@/config/env";
import { User } from "@/entities/User";
import { Interest } from "@/entities/Interest";

const isProduction = config.nodeEnv === "production";

const mysqlConfig: DataSourceOptions = {
  type: "mysql",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [User, Interest],
  synchronize: config.database.synchronize,
  logging: config.database.logging,
  extra: {
    connectionLimit: 10,
  },
};

const sqliteConfig: DataSourceOptions = {
  type: "sqlite",
  database: "./dev.sqlite",
  entities: [User, Interest],
  synchronize: config.database.synchronize,
  logging: config.database.logging,
  enableWAL: true,
};

export const AppDataSource = new DataSource(
  isProduction ? mysqlConfig : sqliteConfig
);

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
