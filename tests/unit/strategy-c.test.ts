import { describe, expect, it } from "vitest";
import { runStrategyC } from "@/core/strategies/strategyC";

describe("Strategy C — selective verification", () => {
  it("runs four pipeline steps and preserves strategy C", async () => {
    const result = await runStrategyC(
      "test-task",
      "Summarize a short document",
    );

    expect(result.taskId).toBe("test-task");
    expect(result.taskInput).toBe("Summarize a short document");
    expect(result.strategy).toBe("C");
    expect(result.steps).toHaveLength(4);
  });
});
