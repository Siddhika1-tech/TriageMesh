import { describe, expect, it } from "vitest";
import { verifyOutput } from "@/core/verifiers/outputVerifier";

describe("output verifier", () => {
  it("returns an output verification result", () => {
    const result = verifyOutput({
      stepId: "step-3",
      agentId: "agent-3",
      input: "Previous agent output",
      output: "Test output",
    });

    expect(result.stepId).toBe("step-3");
    expect(result.verifier).toBe("OUTPUT");
    expect(result.passed).toBe(true);
  });
});