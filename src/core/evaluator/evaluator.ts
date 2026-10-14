
import type { PipelineStep } from "@/core/pipeline/state";
import type { FailureType } from "@/types";

export type EvaluationResult = {
  stepId: string;
  failureDetected: boolean;
  failureType?: FailureType;
};

function classifyObservableFailure(step: PipelineStep): EvaluationResult {
  const output = step.output.trim();
  const failureMarker = output.match(/\[failure:(SPECIFICATION|COORDINATION|OUTPUT)\]/);

  if (failureMarker) {
    return {
      stepId: step.stepId,
      failureDetected: true,
      failureType: failureMarker[1] as FailureType,
    };
  }

  if (!output) {
    return {
      stepId: step.stepId,
      failureDetected: true,
      failureType: "OUTPUT",
    };
  }

  if (!step.input.trim()) {
    return {
      stepId: step.stepId,
      failureDetected: true,
      failureType: "COORDINATION",
    };
  }

  return { stepId: step.stepId, failureDetected: false };
}

export function evaluatePipelineSteps(
  steps: PipelineStep[],
): EvaluationResult[] {
  return steps.map(classifyObservableFailure);
}
