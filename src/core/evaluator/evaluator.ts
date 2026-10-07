import type { PipelineStep } from "@/core/pipeline/state";
import type { FailureType } from "@/types";
export type EvaluationResult = {
  stepId: string;
  failureDetected: boolean;
  failureType?: FailureType;
};

export function evaluatePipelineSteps(
  steps: PipelineStep[],
): EvaluationResult[] {
  return steps.map((step) => ({
    stepId: step.stepId,
    failureDetected: false,
  }));
}