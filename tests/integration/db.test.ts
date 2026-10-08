import { describe, expect, it } from "vitest";
import { db } from "@/lib/db/client";

describe("database connection", () => {
  it("connects to PostgreSQL", async () => {
    const result = await db.query("SELECT 1 AS connected");

    expect(result.rows[0].connected).toBe(1);

    await db.end();
  });
});