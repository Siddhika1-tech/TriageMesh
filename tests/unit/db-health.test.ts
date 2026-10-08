import { describe, expect, it } from "vitest";
import { checkDatabaseConnection } from "@/lib/db/health";

describe("database health check", () => {
  it("returns true when PostgreSQL is reachable", async () => {
    const result = await checkDatabaseConnection();

    expect(result).toBe(true);
  });
});