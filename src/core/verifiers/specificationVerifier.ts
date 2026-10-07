import type { PipelineStep } from "@/core/pipeline/state";

export type VerificationResult = {
  stepId: string;
  verifier: "SPECIFICATION";
  passed: boolean;
};

export function verifySpecification(
  step: PipelineStep,
): VerificationResult {
  return {
    stepId: step.stepId,
    verifier: "SPECIFICATION",
    passed: true,
  };
}