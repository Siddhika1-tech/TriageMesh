import { describe, expect, it } from "vitest";
import { verifySpecification } from "@/core/verifiers/specificationVerifier";

describe("specification verifier", () => {
  it("returns a specification verification result", () => {
    const result = verifySpecification({
      stepId: "step-1",
      agentId: "agent-1",
      input: "Test input",
      output: "Test output",
    });

    expect(result.stepId).toBe("step-1");
    expect(result.verifier).toBe("SPECIFICATION");
    expect(result.passed).toBe(true);
  });
});