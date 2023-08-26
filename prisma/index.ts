import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient; // Make sure to mark it as optional
    }
  }
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma as PrismaClient; // Use a type assertion here
}

export default prisma;
