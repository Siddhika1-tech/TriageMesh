import type { PipelineStep } from "@/core/pipeline/state";

export type VerificationResult = {
  stepId: string;
  verifier: "SPECIFICATION";
  passed: boolean;
  evidence: string;
};

export function verifySpecification(
  step: PipelineStep,
): VerificationResult {
  return {
    stepId: step.stepId,
    verifier: "SPECIFICATION",
    passed: step.input.trim().length > 0 && step.output.trim().length > 0 &&
      !step.output.includes("[failure:SPECIFICATION]"),
    evidence: "Checked that the step had observable input and output.",
  };
}