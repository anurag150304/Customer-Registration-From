import { PrismaClient } from "@prisma/client";

declare global {
    var dbClient: PrismaClient | undefined;
}

const dbClient = globalThis.dbClient || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.dbClient = dbClient;

export default dbClient;