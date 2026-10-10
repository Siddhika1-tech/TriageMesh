import { describe, expect, it } from "vitest";
import { runStrategyA } from "@/core/strategies/strategyA";

describe("Strategy A — baseline", () => {
  it("runs four pipeline steps without returning verification results", async () => {
    const result = await runStrategyA(
      "test-task",
      "Summarize a short document",
    );

    expect(result.taskId).toBe("test-task");
    expect(result.taskInput).toBe("Summarize a short document");
    expect(result.strategy).toBe("A");
    expect(result.steps).toHaveLength(4);
    expect(result).not.toHaveProperty("verificationResults");
  });
});
