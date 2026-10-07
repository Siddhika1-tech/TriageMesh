import type { PipelineStep } from "@/core/pipeline/state";

export type CoordinationVerificationResult = {
  stepId: string;
  verifier: "COORDINATION";
  passed: boolean;
};

export function verifyCoordination(
  step: PipelineStep,
): CoordinationVerificationResult {
  return {
    stepId: step.stepId,
    verifier: "COORDINATION",
    passed: true,
  };
}