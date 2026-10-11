import { describe, expect, it } from "vitest";
import { createTriageResult } from "@/core/triage/createTriageResult";

describe("createTriageResult", () => {
  it("creates a valid result for a detected failure", () => {
    const result = createTriageResult({
      failureDetected: true,
      failureType: "OUTPUT",
      riskLevel: "HIGH",
      evidence: ["Output format does not match the requirements."],
    });

    expect(result.failureDetected).toBe(true);
    expect(result.failureType).toBe("OUTPUT");
    expect(result.riskLevel).toBe("HIGH");
  });

  it("creates a valid result when no failure is detected", () => {
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
    ).toThrow();
  });

  it("rejects a failure type when no failure is detected", () => {
    expect(() =>
      createTriageResult({
        failureDetected: false,
        failureType: "OUTPUT",
        riskLevel: "LOW",
        evidence: [],
      }),
    ).toThrow();
  });
});