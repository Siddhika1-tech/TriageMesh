import { describe, expect, it } from "vitest";
import { runStrategyC } from "@/core/strategies/strategyC";

describe("strategy C", () => {
  it("runs the pipeline with strategy C", async () => {
    const result = await runStrategyC(
      "test-task",
      "Analyze this test task.",
    );

    expect(result.strategy).toBe("C");
    expect(result.steps).toHaveLength(4);
  });
});
