import { db } from "./client";

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await db.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}