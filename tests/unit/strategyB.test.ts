import { describe, expect, it } from "vitest";
import { runStrategyB } from "@/core/strategies/strategyB";

describe("strategy B", () => {
  it("runs the pipeline with strategy B", async () => {
    const result = await runStrategyB(
      "test-task",
      "Analyze this test task.",
    );

    expect(result.strategy).toBe("B");
    expect(result.steps).toHaveLength(4);
  });
});