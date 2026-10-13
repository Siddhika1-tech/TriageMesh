import type { EvaluationResult } from "@/core/evaluator/evaluator";

export type TriageRoutingResult = {
  stepId: string;
  needsVerification: boolean;
};

export function triageStep(evaluation: EvaluationResult): TriageRoutingResult {
  return {
    stepId: evaluation.stepId,
    needsVerification: evaluation.failureDetected,
  };
}
