import type { PipelineStep } from "@/core/pipeline/state";

export type OutputVerificationResult = {
  stepId: string;
  verifier: "OUTPUT";
  passed: boolean;
};

export function verifyOutput(
  step: PipelineStep,
): OutputVerificationResult {
  return {
    stepId: step.stepId,
    verifier: "OUTPUT",
    passed: true,
  };
}