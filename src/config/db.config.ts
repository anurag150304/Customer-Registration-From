import { PrismaClient } from "@prisma/client";

// Declaring a global variable to store the PrismaClient instance
// This ensures that the PrismaClient is reused across hot-reloads in development mode
// Prevents creating multiple instances of PrismaClient, which can lead to connection issues
declare global {
    var dbClient: PrismaClient | undefined;
}
// If a global instance already exists (e.g., during development), reuse it
const dbClient = globalThis.dbClient || new PrismaClient();

// This avoids creating a new instance on every module reload
if (process.env.NODE_ENV !== "production") globalThis.dbClient = dbClient;
export default dbClient;