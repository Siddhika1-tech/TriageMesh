import { describe, expect, it } from "vitest";
import { pipeline } from "@/core/pipeline/graph";

describe("pipeline", () => {
  it("executes the agent step", async () => {
    const app = pipeline.compile();

    const result = await app.invoke({
      taskId: "test-task",
      strategy: "A",
      steps: [],
    });

    expect(result.taskId).toBe("test-task");
    expect(result.strategy).toBe("A");
    expect(result.steps).toHaveLength(1);
    expect(result.steps[0].stepId).toBe("step-1");
    expect(result.steps[0].agentId).toBe("agent-1");
    expect(result.steps[0].output).toBe("Agent 1 completed its step.");
  });
});