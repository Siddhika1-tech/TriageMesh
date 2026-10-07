import { describe, expect, it } from "vitest";
import { evaluatePipelineSteps } from "@/core/evaluator/evaluator";

describe("evaluator", () => {
  it("evaluates every pipeline step", () => {
    const result = evaluatePipelineSteps([
      {
        stepId: "step-1",
        agentId: "agent-1",
        input: "Input 1",
        output: "Output 1",
      },
      {
        stepId: "step-2",
        agentId: "agent-2",
        input: "Output 1",
        output: "Output 2",
      },
    ]);

    expect(result).toHaveLength(2);
    expect(result[0].stepId).toBe("step-1");
    expect(result[1].stepId).toBe("step-2");
    expect(result[0].failureDetected).toBe(false);
    expect(result[1].failureDetected).toBe(false);
    expect(result[0].failureType).toBeUndefined();
  });
});