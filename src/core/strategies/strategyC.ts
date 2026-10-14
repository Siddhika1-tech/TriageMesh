import { runPipeline } from "@/core/pipeline/run";
import { evaluatePipelineSteps } from "@/core/evaluator/evaluator";
import { routeFailure } from "@/core/router/router";
import { verifyCoordination } from "@/core/verifiers/coordinationVerifier";
import { verifyOutput } from "@/core/verifiers/outputVerifier";
import { verifySpecification } from "@/core/verifiers/specificationVerifier";
import { estimateTokens } from "@/core/metrics";

export async function runStrategyC(
  taskId: string,
  taskInput: string,
) {
  const result = await runPipeline(taskId, taskInput, "C");
  const verificationStartedAt = performance.now();
  const evaluations = evaluatePipelineSteps(result.steps);
  const verificationResults = evaluations.flatMap((evaluation) => {
    if (!evaluation.failureDetected || !evaluation.failureType) {
      return [];
    }

    const step = result.steps.find((candidate) => candidate.stepId === evaluation.stepId);
    if (!step) {
      throw new Error(`Unable to route missing step ${evaluation.stepId}.`);
    }

    const verifier = routeFailure(evaluation.failureType);
    return [
      verifier === "SPECIFICATION"
        ? verifySpecification(step)
        : verifier === "COORDINATION"
          ? verifyCoordination(step)
          : verifyOutput(step),
    ];
  });

  return {
    ...result,
    verificationResults,
    metrics: {
      ...result.metrics,
      verificationCalls: verificationResults.length,
      totalTokens: result.metrics.totalTokens + verificationResults.reduce(
        (total, verification) => total + estimateTokens(verification.evidence),
        0,
      ),
      latencyMs: result.metrics.latencyMs + (performance.now() - verificationStartedAt),
      reliability: verificationResults.length === 0
        ? result.metrics.reliability
        : verificationResults.filter((verification) => verification.passed).length /
          verificationResults.length,
    },
  };
}