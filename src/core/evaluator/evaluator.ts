import type { PipelineStep } from "@/core/pipeline/state";

export type EvaluationResult = {
  stepId: string;
  failureDetected: boolean;
};

export function evaluateStep(step: PipelineStep): EvaluationResult {
  return {
    stepId: step.stepId,
    failureDetected: false,
  };
}