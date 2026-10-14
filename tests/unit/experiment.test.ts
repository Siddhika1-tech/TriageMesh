import { describe, expect, it } from "vitest";
import { runExperiment } from "@/core/experiment";

describe("experiment runner", () => {
  it("reports comparable metrics for exactly three strategies", async () => {
    const rows = await runExperiment(["Summarize this input"]);

    expect(rows.map((row) => row.strategy)).toEqual(["A", "B", "C"]);
    expect(rows[0].verificationCalls).toBe(0);
    expect(rows[1].verificationCalls).toBe(4);
    expect(rows[2].verificationCalls).toBe(0);
    expect(rows.every((row) => row.reliability === 1)).toBe(true);
    expect(rows.every((row) => row.totalTokens > 0)).toBe(true);
    expect(rows.every((row) => row.latencyMs >= 0)).toBe(true);
  });

  it("rejects invalid repetition counts", async () => {
    await expect(runExperiment(["input"], 0)).rejects.toThrow(
      "positive integer",
    );
  });
});
