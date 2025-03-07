import { PrismaClient } from "@prisma/client";

export interface MyContext {
  token?: String;
  prisma: PrismaClient;
}
