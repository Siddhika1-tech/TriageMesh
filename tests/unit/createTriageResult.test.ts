import { describe, expect, it } from "vitest";
import { createTriageResult } from "@/core/triage/createTriageResult";

describe("createTriageResult", () => {
  it("creates a result when a failure is detected", () => {
    const result = createTriageResult({
      failureDetected: true,
      failureType: "OUTPUT",
      riskLevel: "HIGH",
      evidence: ["The output does not match the requested format."],
    });

    expect(result.failureDetected).toBe(true);
    expect(result.failureType).toBe("OUTPUT");
    expect(result.riskLevel).toBe("HIGH");
  });

  it("creates a result when no failure is detected", () => {
    const result = createTriageResult({
      failureDetected: false,
      riskLevel: "LOW",
      evidence: [],
    });

    expect(result.failureDetected).toBe(false);
    expect(result.failureType).toBeUndefined();
  });

  it("rejects a detected failure without a failure type", () => {
    expect(() =>
      createTriageResult({
        failureDetected: true,
        riskLevel: "HIGH",
        evidence: [],
      }),
    ).toThrow("A detected failure must have a failure type.");
  });

  it("rejects a failure type when no failure is detected", () => {
    expect(() =>
      createTriageResult({
        failureDetected: false,
        failureType: "OUTPUT",
        riskLevel: "LOW",
        evidence: [],
      }),
    ).toThrow("A failure type cannot be set when no failure is detected.");
  });
});
