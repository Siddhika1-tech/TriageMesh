import type { PipelineStep } from "@/core/pipeline/state";

export type CoordinationVerificationResult = {
  stepId: string;
  verifier: "COORDINATION";
  passed: boolean;
  evidence: string;
};

export function verifyCoordination(
  step: PipelineStep,
): CoordinationVerificationResult {
  return {
    stepId: step.stepId,
    verifier: "COORDINATION",
    passed: step.input.trim().length > 0 && step.output.trim().length > 0 &&
      !step.output.includes("[failure:COORDINATION]"),
    evidence: "Checked that the step received observable upstream content.",
  };
}