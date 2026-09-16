import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

// Prisma 7 requires a database driver adapter.
const adapter = new PrismaPg({
  connectionString,
});

// Create the Prisma client using our generated Prisma Client.
export const prisma = new PrismaClient({
  adapter,
});