import { runPipeline } from "@/core/pipeline/run";
import { verifySpecification } from "@/core/verifiers/specificationVerifier";
import { verifyCoordination } from "@/core/verifiers/coordinationVerifier";
import { verifyOutput } from "@/core/verifiers/outputVerifier";
import { estimateTokens } from "@/core/metrics";

export async function runStrategyB(
  taskId: string,
  taskInput: string,
) {
  const result = await runPipeline(taskId, taskInput, "B");

  const verificationStartedAt = performance.now();
  const verificationResults = result.steps.map((step, index) => {
    if (index % 3 === 0) {
      return verifySpecification(step);
    }

    if (index % 3 === 1) {
      return verifyCoordination(step);
    }

    return verifyOutput(step);
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
      reliability: verificationResults.filter((verification) => verification.passed).length /
        verificationResults.length,
    },
  };
}