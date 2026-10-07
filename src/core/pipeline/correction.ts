import type { PipelineStep } from "@/core/pipeline/state";

export type CorrectionResult = {
  step: PipelineStep;
  corrected: boolean;
};

export function correctStep(
  step: PipelineStep,
): CorrectionResult {
  return {
    step,
    corrected: false,
  };
}