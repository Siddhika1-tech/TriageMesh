import { describe, expect, it } from "vitest";
import { verifyCoordination } from "@/core/verifiers/coordinationVerifier";

describe("coordination verifier", () => {
  it("returns a coordination verification result", () => {
    const result = verifyCoordination({
      stepId: "step-2",
      agentId: "agent-2",
      input: "Previous agent output",
      output: "Test output",
    });

    expect(result.stepId).toBe("step-2");
    expect(result.verifier).toBe("COORDINATION");
    expect(result.passed).toBe(true);
  });
});