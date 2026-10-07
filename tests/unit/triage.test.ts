import { describe, expect, it } from "vitest";
import { triageStep } from "@/core/triage/triage";

describe("triage", () => {
  it("does not request verification when no failure is detected", () => {
    const result = triageStep({
      stepId: "step-1",
      failureDetected: false,
    });

    expect(result.stepId).toBe("step-1");
    expect(result.needsVerification).toBe(false);
  });

  it("requests verification when a failure is detected", () => {
    const result = triageStep({
      stepId: "step-2",
      failureDetected: true,
    });

    expect(result.stepId).toBe("step-2");
    expect(result.needsVerification).toBe(true);
  });
});