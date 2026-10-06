import type { PipelineStep } from "@/core/pipeline/state";

export type EvaluationResult = {
  stepId: string;
  failureDetected: boolean;
};

export function evaluatePipelineSteps(
  steps: PipelineStep[],
): EvaluationResult[] {
  return steps.map((step) => ({
    stepId: step.stepId,
    failureDetected: false,
  }));
}