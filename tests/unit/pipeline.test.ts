import { describe, expect, it } from "vitest";
import { pipeline } from "@/core/pipeline/graph";

describe("pipeline", () => {
  it("executes the initialization node", async () => {
    const app = pipeline.compile();

    const result = await app.invoke({
      taskId: "test-task",
      strategy: "A",
      steps: [],
    });

    expect(result.taskId).toBe("test-task");
    expect(result.strategy).toBe("A");
    expect(result.steps).toEqual([]);
  });
});