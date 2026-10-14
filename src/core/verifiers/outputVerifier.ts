import type { PipelineStep } from "@/core/pipeline/state";

export type OutputVerificationResult = {
  stepId: string;
  verifier: "OUTPUT";
  passed: boolean;
  evidence: string;
};

export function verifyOutput(
  step: PipelineStep,
): OutputVerificationResult {
  return {
    stepId: step.stepId,
    verifier: "OUTPUT",
    passed: step.output.trim().length > 0 &&
      !step.output.includes("[failure:OUTPUT]"),
    evidence: "Checked that the step produced non-empty observable output.",
  };
}