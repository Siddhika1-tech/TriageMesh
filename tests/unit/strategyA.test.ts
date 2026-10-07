import { describe, expect, it } from "vitest";
import { runStrategyA } from "@/core/strategies/strategyA";

describe("strategy A", () => {
  it("runs the pipeline without verification", async () => {
    const result = await runStrategyA(
      "test-task",
      "Analyze this test task.",
    );

    expect(result.strategy).toBe("A");
    expect(result.steps).toHaveLength(4);
    expect(result.steps[0].stepId).toBe("step-1");
    expect(result.steps[3].stepId).toBe("step-4");
  });
});