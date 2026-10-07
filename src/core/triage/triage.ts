import type { EvaluationResult } from "@/core/evaluator/evaluator";

export type TriageResult = {
  stepId: string;
  needsVerification: boolean;
};

export function triageStep(
  evaluation: EvaluationResult,
): TriageResult {
  return {
    stepId: evaluation.stepId,
    needsVerification: evaluation.failureDetected,
  };
}