
import { describe, expect, it } from "vitest";
import { runPipeline } from "@/core/pipeline/run";

describe("TriageMesh pipeline", () => {
  it("executes four sequential agent steps", async () => {
    const result = await runPipeline(
      "test-task",
      "Summarize a short document",
      "A",
    );

    expect(result.taskId).toBe("test-task");
    expect(result.taskInput).toBe("Summarize a short document");
    expect(result.strategy).toBe("A");
    expect(result.steps).toHaveLength(4);

    expect(result.steps[0].stepId).toBe("step-1");
    expect(result.steps[1].stepId).toBe("step-2");
    expect(result.steps[2].stepId).toBe("step-3");
    expect(result.steps[3].stepId).toBe("step-4");
  });

  it.each(["A", "B", "C"] as const)(
    "preserves strategy %s",
    async (strategy) => {
      const result = await runPipeline(
        "test-task",
        "Test input",
        strategy,
      );

      expect(result.strategy).toBe(strategy);
      expect(result.steps).toHaveLength(4);
    },
  );
});
