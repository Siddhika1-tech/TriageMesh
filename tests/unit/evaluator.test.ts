import { describe, expect, it } from "vitest";
import { evaluateStep } from "@/core/evaluator/evaluator";

describe("evaluator", () => {
  it("evaluates a pipeline step", () => {
    const result = evaluateStep({
      stepId: "step-1",
      agentId: "agent-1",
      input: "Test input",
      output: "Test output",
    });

    expect(result.stepId).toBe("step-1");
    expect(result.failureDetected).toBe(false);
  });
});