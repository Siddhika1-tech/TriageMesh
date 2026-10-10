import type { FailureType, RiskLevel, TriageResult } from "@/types";

type TriageInput = {
  failureDetected: boolean;
  failureType?: FailureType;
  riskLevel: RiskLevel;
  evidence: string[];
};

export function createTriageResult(input: TriageInput): TriageResult {
  if (input.failureDetected && !input.failureType) {
    throw new Error("A detected failure must have a failure type.");
  }

  if (!input.failureDetected && input.failureType) {
    throw new Error(
      "A failure type cannot be set when no failure is detected.",
    );
  }

  return {
    failureDetected: input.failureDetected,
    ...(input.failureType ? { failureType: input.failureType } : {}),
    riskLevel: input.riskLevel,
    evidence: [...input.evidence],
  };
}
