import { describe, expect, it } from "vitest";
import { runPipeline } from "@/core/pipeline/run"; 

describe("pipeline", () => {
  it("passes task input through the four-agent pipeline", async () => {
   const result = await runPipeline(
  "test-task",
  "Analyze this test task.",
  "A",
);
    expect(result.taskId).toBe("test-task");
    expect(result.taskInput).toBe("Analyze this test task.");
    expect(result.strategy).toBe("A");
    expect(result.steps).toHaveLength(4);

    expect(result.steps[0].input).toBe("Analyze this test task.");
    expect(result.steps[0].output).toBe("Agent 1 completed its step.");

    expect(result.steps[1].input).toBe("Agent 1 completed its step.");
    expect(result.steps[2].input).toBe("Agent 2 completed its step.");
    expect(result.steps[3].input).toBe("Agent 3 completed its step.");
  });
});