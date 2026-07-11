import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// On Vercel, copy the build-time SQLite db to /tmp so it is writable at runtime
if (process.env.VERCEL) {
  const dbName = "dev.db";
  const sourcePath = path.join(process.cwd(), "prisma", dbName);
  const destPath = path.join("/tmp", dbName);

  try {
    if (!fs.existsSync(destPath)) {
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log("Successfully copied SQLite database to /tmp/dev.db");
      } else {
        console.warn("Source SQLite database not found at", sourcePath);
      }
    }
    // Set environment variable so Prisma connects to the writable location
    process.env.DATABASE_URL = `file:${destPath}`;
  } catch (err) {
    console.error("Failed to copy SQLite database to /tmp:", err);
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
