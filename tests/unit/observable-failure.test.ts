import { describe, expect, it } from "vitest";
import { evaluatePipelineSteps } from "@/core/evaluator/evaluator";
import { verifyOutput } from "@/core/verifiers/outputVerifier";

describe("observable failure handling", () => {
  it("classifies only an observable output marker", () => {
    const [evaluation] = evaluatePipelineSteps([{
      stepId: "step-1",
      agentId: "agent-1",
      input: "Visible input",
      output: "[failure:OUTPUT] Visible failure",
    }]);

    expect(evaluation).toMatchObject({
      failureDetected: true,
      failureType: "OUTPUT",
    });
  });

  it("does not pass a marked output failure", () => {
    const result = verifyOutput({
      stepId: "step-1",
      agentId: "agent-1",
      input: "Visible input",
      output: "[failure:OUTPUT] Visible failure",
    });

    expect(result.passed).toBe(false);
  });
});
