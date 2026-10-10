import { describe, expect, it } from "vitest";
import { runStrategyB } from "@/core/strategies/strategyB";

describe("Strategy B — uniform verification", () => {
  it("runs four steps and returns verification results", async () => {
    const result = await runStrategyB(
      "test-task",
      "Summarize a short document",
    );

    expect(result.taskId).toBe("test-task");
    expect(result.strategy).toBe("B");
    expect(result.steps).toHaveLength(4);
    expect(result.verificationResults).toHaveLength(4);
  });
});
